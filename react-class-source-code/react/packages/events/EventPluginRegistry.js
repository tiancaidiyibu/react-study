/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {DispatchConfig} from './ReactSyntheticEventType';
import type {
  AnyNativeEvent,
  PluginName,
  PluginModule,
} from './PluginModuleType';

import invariant from 'shared/invariant';

type NamesToPlugins = {[key: PluginName]: PluginModule<AnyNativeEvent>};
type EventPluginOrder = null | Array<PluginName>;

/**
 * Injectable ordering of event plugins.
 */
let eventPluginOrder: EventPluginOrder = null;

/**
 * Injectable mapping from names to event plugin modules.
 */
const namesToPlugins: NamesToPlugins = {};

/**
 * Recomputes the plugin list using the injected plugins and plugin ordering.
 *
 * @private
 */
function recomputePluginOrdering(): void {
  if (!eventPluginOrder) {
    // Wait until an `eventPluginOrder` is injected.
    return;
  }
  // 遍历namesToPlugins
  for (const pluginName in namesToPlugins) {
    const pluginModule = namesToPlugins[pluginName];
    // 查找pluginName在eventPluginOrder数组的index从(1,2,3,4,5),0没有
    const pluginIndex = eventPluginOrder.indexOf(pluginName);
    invariant(
      pluginIndex > -1,
      'EventPluginRegistry: Cannot inject event plugins that do not exist in ' +
        'the plugin ordering, `%s`.',
      pluginName,
    );
    // plugins是个数组，初始化是空数组
    if (plugins[pluginIndex]) {
      continue;
    }
    invariant(
      pluginModule.extractEvents,
      'EventPluginRegistry: Event plugins must implement an `extractEvents` ' +
        'method, but `%s` does not.',
      pluginName,
    );
    // 根据查到index插入pluginModule到plugins数组中
    plugins[pluginIndex] = pluginModule;
    // 拿到pluginModule的eventTypes,可以查看ChangeEventPlugin来学习
    // eventTypes是以具体事件为key的 map 对象，其中每个事件的phasedRegistrationNames是指定props的名字，dependencies是如果需要绑定change事件需要同时绑定哪些事件
    const publishedEvents = pluginModule.eventTypes;
    // 遍历publishedEvents
    for (const eventName in publishedEvents) {
      invariant(
        publishEventForPlugin(
          publishedEvents[eventName], //ChangeEventPlugin.eventTypes.change
          pluginModule, //ChangeEventPlugin
          eventName, //change
        ),
        'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.',
        eventName,
        pluginName,
      );
    }
  }
}

/**
 * Publishes an event so that it can be dispatched by the supplied plugin.
 * @ikki
 * @param {object} dispatchConfig eventTypes配置项 // Dispatch configuration for the event.
 * @param {object} PluginModule  Plugin publishing the event.
 * @return {eventName} eventTypes配置项的名字  True if the event was successfully published.
 * @private
 */
function publishEventForPlugin(
  dispatchConfig: DispatchConfig,
  pluginModule: PluginModule<AnyNativeEvent>,
  eventName: string,
): boolean {
  invariant(
    !eventNameDispatchConfigs.hasOwnProperty(eventName),
    'EventPluginHub: More than one plugin attempted to publish the same ' +
      'event name, `%s`.',
    eventName,
  );
  // eventNameDispatchConfigs全局对象，默认是空的
  // { change: changeEventPlugin.eventTypes.change }
  eventNameDispatchConfigs[eventName] = dispatchConfig;

  // 获取changeEventPlugin.eventTypes.change.phasedRegistrationNames
  // 也就是{ bubbled: 'onChange',captured: 'onChangeCapture',}
  const phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
  if (phasedRegistrationNames) {
    
    for (const phaseName in phasedRegistrationNames) {
      if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
        const phasedRegistrationName = phasedRegistrationNames[phaseName];
        publishRegistrationName(
          phasedRegistrationName, //例如onchange
          pluginModule,  //changeEventPlugin
          eventName, //change
        );
      }
    }
    return true;
  } else if (dispatchConfig.registrationName) {
    publishRegistrationName(
      dispatchConfig.registrationName,
      pluginModule,
      eventName,
    );
    return true;
  }
  return false;
}

/**
 * Publishes a registration name that is used to identify dispatched events.
 *
 * @param {string} registrationName 例如onchange
 * @param {object} PluginModule ChangeEventPlugin
 * @param {string}  eventName change
 * @private
 */
function publishRegistrationName(
  registrationName: string,
  pluginModule: PluginModule<AnyNativeEvent>,
  eventName: string,
): void {
  invariant(
    !registrationNameModules[registrationName],
    'EventPluginHub: More than one plugin attempted to publish the same ' +
      'registration name, `%s`.',
    registrationName,
  );
  // {onchange : ChangeEventPlugin}
  registrationNameModules[registrationName] = pluginModule;
  // {onchange : TOP_BLUR....等}
  registrationNameDependencies[registrationName] =
    pluginModule.eventTypes[eventName].dependencies;

  if (__DEV__) {
    const lowerCasedName = registrationName.toLowerCase();
    possibleRegistrationNames[lowerCasedName] = registrationName;

    if (registrationName === 'onDoubleClick') {
      possibleRegistrationNames.ondblclick = registrationName;
    }
  }
}

/**
 * Registers plugins so that they can extract and dispatch events.
 *
 * @see {EventPluginHub}
 */

/**
 * Ordered list of injected plugins.
 */
export const plugins = [];


//  例如changeEventPlugin
// {
//   change: changeEventPlugin.eventTypes.change,
//   ...other plugins
// }
export const eventNameDispatchConfigs = {};
//  例如changeEventPlugin
// {
//   onChange: changeEventPlugin,
//   onChangeCapture: changeEventPlugin
// }
export const registrationNameModules = {};
//  例如changeEventPlugin
// {
//   onChange: ChangePlugin.eventTypes.change.dependencies,
//   onChangeCapture: ChangePlugin.eventTypes.change.dependencies
// }
export const registrationNameDependencies = {};

/**
 * Mapping from lowercase registration names to the properly cased version,
 * used to warn in the case of missing event handlers. Available
 * only in __DEV__.
 * @type {Object}
 */
export const possibleRegistrationNames = __DEV__ ? {} : (null: any);
// Trust the developer to only use possibleRegistrationNames in __DEV__

/**
 * Injects an ordering of plugins (by plugin name). This allows the ordering
 * to be decoupled from injection of the actual plugins so that ordering is
 * always deterministic regardless of packaging, on-the-fly injection, etc.
 *
 * @param {array} InjectedEventPluginOrder
 * @internal
 * @see {EventPluginHub.injection.injectEventPluginOrder}
 */
export function injectEventPluginOrder(
  injectedEventPluginOrder: EventPluginOrder,
): void {
  invariant(
    !eventPluginOrder,
    'EventPluginRegistry: Cannot inject event plugin ordering more than ' +
      'once. You are likely trying to load more than one copy of React.',
  );
  // Clone the ordering so it cannot be dynamically mutate
  //  复制EventPluginHub.injection.injectEventPluginOrder传入的数组DOMEventPluginOrder
  // const DOMEventPluginOrder = [
  //   'ResponderEventPlugin',
  //   'SimpleEventPlugin',
  //   'EnterLeaveEventPlugin',
  //   'ChangeEventPlugin',
  //   'SelectEventPlugin',
  //   'BeforeInputEventPlugin',
  // ];
  eventPluginOrder = Array.prototype.slice.call(injectedEventPluginOrder);
  recomputePluginOrdering();
}

/**
 * Injects plugins to be used by `EventPluginHub`. The plugin names must be
 * in the ordering injected by `injectEventPluginOrder`.
 *
 * Plugins can be injected as part of page initialization or on-the-fly.
 *
 * @param {object} injectedNamesToPlugins Map from names to plugin modules.
 * @internal
 * @see {EventPluginHub.injection.injectEventPluginsByName}
 */
/**
 * @ikki
 * @param {*} injectedNamesToPlugins  EventPluginHub.injection.injectEventPluginsByName传的对象
 */
export function injectEventPluginsByName(
  
  injectedNamesToPlugins: NamesToPlugins,
): void {
  let isOrderingDirty = false;
  // 遍历injectedNamesToPlugins，第一次将injectedNamesToPlugins中的key，v放入到namesToPlugins对象中
  for (const pluginName in injectedNamesToPlugins) {
    if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
      continue;
    }
    const pluginModule = injectedNamesToPlugins[pluginName];
    if (
      !namesToPlugins.hasOwnProperty(pluginName) ||
      namesToPlugins[pluginName] !== pluginModule
    ) {
      invariant(
        !namesToPlugins[pluginName],
        'EventPluginRegistry: Cannot inject two different event plugins ' +
          'using the same name, `%s`.',
        pluginName,
      );
      namesToPlugins[pluginName] = pluginModule;
      isOrderingDirty = true;
    }
  }
  if (isOrderingDirty) {
    recomputePluginOrdering();
  }
}

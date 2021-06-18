/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ReactVersion from 'shared/ReactVersion';
import { 
  REACT_CONCURRENT_MODE_TYPE,
  REACT_FRAGMENT_TYPE,
  REACT_PROFILER_TYPE,
  REACT_STRICT_MODE_TYPE,
  REACT_SUSPENSE_TYPE,
} from 'shared/ReactSymbols';

import {Component, PureComponent} from './ReactBaseClasses';
import {createRef} from './ReactCreateRef';
import {forEach, map, count, toArray, only} from './ReactChildren';
import {
  createElement,
  createFactory,
  cloneElement,
  isValidElement,
} from './ReactElement';
import {createContext} from './ReactContext';
import {lazy} from './ReactLazy';
import forwardRef from './forwardRef';
import memo from './memo';
import {
  createElementWithValidation,
  createFactoryWithValidation,
  cloneElementWithValidation,
} from './ReactElementValidator';
import ReactSharedInternals from './ReactSharedInternals';
import {enableStableConcurrentModeAPIs} from 'shared/ReactFeatureFlags';

const React = {
  Children: {
    /**
     * @ikki
     * @map React.Children.map(props.children,c=>[c,[c,[c]]]) 返回的都是flat过后的数组[c,c,c]
     */
    map,
    forEach,
    count,
    toArray,
    only,
  },

  /**
   * @ikki
   * 
   * @createRef 返回一个对象{current:null}
   */
  createRef,
  Component,
  PureComponent,

  createContext,
  forwardRef,
  lazy,
  memo,

  Fragment: REACT_FRAGMENT_TYPE,
  StrictMode: REACT_STRICT_MODE_TYPE,
  Suspense: REACT_SUSPENSE_TYPE,

  createElement: __DEV__ ? createElementWithValidation : createElement,
  cloneElement: __DEV__ ? cloneElementWithValidation : cloneElement,
  createFactory: __DEV__ ? createFactoryWithValidation : createFactory,
  isValidElement: isValidElement,

  version: ReactVersion,

  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactSharedInternals,
};

if (enableStableConcurrentModeAPIs) {
  //ikki ConcurrentMode将组建包裹在<ConcurrentMode />内部会使得组件更新变成低优先级
  React.ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
  React.Profiler = REACT_PROFILER_TYPE;
} else {
  React.unstable_ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
  React.unstable_Profiler = REACT_PROFILER_TYPE;
}

export default React;

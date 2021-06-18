const channelTableData = [];
for (let i = 0; i < 10; i++) {
  channelTableData.push({
    id: i,
    name: `名字${  i}`,
    age: i,
    city: `城市${  i}`,
  });
}
function searchChannelData(name) {
  const res = [];
  for (let i = 0; i < 10; i++) {
    if (channelTableData[i].name.indexOf(name) > -1) {
      res.push(channelTableData[i]);
    }
  }
  return res;
}
export default {
  // 支持值为 Object 和 Array
  'GET /api/getChannelData': {
    // 查询表单数据
    data: [...channelTableData],
  },
  'POST /api/getChannelDataBySearch': (req, res) => {
    // 搜索
    res.send({
      status: 'ok',
      data: searchChannelData(req.body.name),
    });
  },
};

## 简介

该组件是基于`ant design table`进行二次封装，解决基本嵌套表格通用业务场景的table组件。
以下是文档内容：

- 功能
- 使用
- 注意项

## 功能

1.由数据渲染视图，理论上可以无限层级嵌套展示多维度数据,具体由业务调用组件事通过配置决定;

2.双击行编辑，并可保存数据，取消编辑;

3.增加同级数据，在点击行同级下增加一条可编辑数据;

4.增加子级数据，在点击行子级下增加一条可编辑数据;

5.删除数据，删除该节点，包含其子节点的所有数据.


## 使用

1.业务组件内引入该组件

```
import ExpandTreeTable from "@components/ExpandTreeTable.jsx";
```

2.绑定props数据。`'dataSource'(数据源),'tableHeaderConfig'(表头配置)`为必传项

```
    <ExpandTreeTable
      dataSource={dataSource}
      tableHeaderConfig={tableHeaderConfig}
    />
```

## 注意项

1.`dataSource`在组件中使用到的字段有`'key','columns','children','editable'`

- `'key'` :该条数据的唯一标识，类似于id
- `'children'` ：该条数据的子项集合
- `'columns'` ：需要为每个带children的数据配置表头(其字段除了`editable`外，均为固定配置)
- `'editable'` ：可编辑的列

其中，`'key'`为dataConfig的必须字段，`'children'`和`'columns'`则须同时出现，`'editable'`为可选配置项，案例如下：

```
const dataConfig=[ {
      id: "2",
      key: "2",
      name: "商品2",
      productType: "厨卫类",
      factory: "A厂",
      columns:[{
        title: "商品名称",
        dataIndex: "productName",
        key: "productName",
        editable:true
      },
      {
        title: "商品类型",
        dataIndex: "type",
        key: "type",
        editable:true
      },
      {
        title: "品牌",
        dataIndex: "brand",
        key: "brand",
        editable:true
      },
      {
        title: "价格",
        dataIndex: "price",
        key: "price",
        editable:true
      },
      {
        title: "颜色",
        dataIndex: "color",
        key: "color",
        editable:true
      }],
      children: [
        {
          id: "11",
          key: "2.1",
          productName: "A锅",
          type: "厨具",
          brand: "S牌",
          price: '199,211',
          color: "黑色,银色",
          columns:[{
            title: "名称",
            dataIndex: "typename",
            key: "typename",
            editable:true
          },
          {
            title: "价格",
            dataIndex: "typeprice",
            key: "typeprice",
            editable:true
          },
          {
            title: "颜色",
            dataIndex: "typecolor",
            key: "typecolor",
            editable:true
          }],
          children: [
            {
              id: "111",
              key: "2.1.1",
              typename: "A锅A型",
              typeprice: 199,
              typecolor: "黑色"
            },
            {
              id: "112",
              key: "2.1.2",
              typename: "A锅B型",
              typeprice: 211,
              typecolor: "银色"
            }
          ]
        }
      ]
    }]
```

2.`tableHeaderConfig`为表头层级配置，案例如下:

```
const tableHeaderConfig = [
    [
      { title: "名称", dataIndex: "name", key: "name",editable:true },
      { title: "类型", dataIndex: "productType", key: "productType",editable:true },
      { title: "厂家", dataIndex: "factory", key: "factory",editable:true }
    ],
    [
      {
        title: "商品名称",
        dataIndex: "productName",
        key: "productName",
        editable:true
      },
      {
        title: "商品类型",
        dataIndex: "type",
        key: "type",
        editable:true
      },
      {
        title: "品牌",
        dataIndex: "brand",
        key: "brand",
        editable:true
      },
      {
        title: "价格",
        dataIndex: "price",
        key: "price",
        editable:true
      },
      {
        title: "颜色",
        dataIndex: "color",
        key: "color",
        editable:true
      }
    ],[
      {
        title: "名称",
        dataIndex: "typename",
        key: "typename",
        editable:true
      },
      {
        title: "价格",
        dataIndex: "typeprice",
        key: "typeprice",
        editable:true
      },
      {
        title: "颜色",
        dataIndex: "typecolor",
        key: "typecolor",
        editable:true
      }
    ],
    [
      {
        title: "名称1",
        dataIndex: "typename",
        key: "typename",
        


        editable:true
      },
      {
        title: "价格1",
        dataIndex: "typeprice",
        key: "typeprice",
        editable:true
      },
      {
        title: "颜色1",
        dataIndex: "typecolor",
        key: "typecolor",
        editable:true
      }
    ]
]
```
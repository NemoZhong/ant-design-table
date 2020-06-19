export default [
    {
      id: "1",
      key: "1",
      name: "商品1",
      productType: "家具类",
      factory: "A厂",
      sss: "sss",
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
          id: "1",
          key: "1.1",
          productName: "A电视",
          type: "家电",
          brand: "A牌",
          price: 1999,
          color: "黑色"
        }
      ]
    },
    {
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
    },
    {
      id: "3",
      key: "3",
      name: "商品3",
      productType: "电子类",
      factory: "F厂",
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
          id: "21",
          key: "3.1",
          productName: "A手机",
          type: "手机",
          brand: "R牌",
          price: 3999,
          color: "黑色"
        }
      ]
    },
    {
      id: "4",
      key: "4",
      name: "商品4",
      productType: "电子类",
      factory: "F厂"
    }
  ];

  export const tableHeaderConfig = [
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
    ],[
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
  
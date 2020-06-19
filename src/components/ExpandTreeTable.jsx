import React, { memo, useState, useEffect } from "react";
import { Table, Input, InputNumber, Form, Button,message } from "antd";
import {getLevelByKeyInTree} from '@/utils/index.js'

// 编辑单元格组件
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0
          }}
          rules={[
            {
              required: true,
              message: `请输入${title}!`
            }
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

// 主table
const NestedTable = props => {
  // 初始化数据
  const data = JSON.parse(JSON.stringify(props.dataSource));
  const tableHeaderConfig=JSON.parse(JSON.stringify(props.tableHeaderConfig))
  const columns = [
    ...tableHeaderConfig[0],
    {
      title: "操作",
      key: "operation",
      render: (e, record) => {
        return (
          <div>
            {editingKey !== "" ? (
              <span>
                <Button
                  style={{'marginRight':'10px'}}
                  type="primary"
                  disabled={editingKey !== record.key}
                  onClick={() => save(record)}
                >
                  保存
                </Button>
                <Button
                  type="ghost"
                  disabled={editingKey !== record.key}
                  onClick={() => cancel()}
                >
                  取消
                </Button>
              </span>
            ) : (
              <span>
                <Button type="primary" onClick={() => addData(record)}>增加同级</Button>
                <Button type="ghost" onClick={() => addChildData(record)}>增加子级</Button>
                <Button type="danger"  onClick={() => removeData(record)}>删除</Button>
              </span>
            )}
          </div>
        );
      }
    }
  ];

  // 状态初始化
  const [form] = Form.useForm();
  const [editData, setData] = useState(data);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  useEffect(() => {
    console.log('editDataChanged',editData)
  }, [editData]);

  // 判断data是否在编辑状态
  const isEditing = record => record.key === editingKey;

  /**
   *  根据单条数据，操作editData，递归增，删，增加子项，保存
   * 
   */
  const addDataRepeat = (data, key,record) => {
    const newData = JSON.parse(JSON.stringify(data));
    const addData=(data, key)=>{
      for (let i = 0, length = newData.length; i < length; i++) {
        let item = data[i];
        if (item&&(item.key === key)) {
          let _key = (+new Date()).toString()
          data.splice(i + 1, 0, {
            key:_key,
            ...record
          });
          setEditingKey(_key)
          break;
        } else if (item&&item.children && item.children.length > 0) {
          addData(item.children, key);
        }
      }
    }
    addData(data, key)
  };
  const removeDataRepeat = (data, key) => {
    const newData = JSON.parse(JSON.stringify(data));
    const removeDataFn=(data,key)=>{
      for (let i = 0, length = newData.length; i < length; i++) {
        let item = data[i];
        if (item&&(item.key === key)) {
          data.splice(i, 1);
        } else if (item&&item.children && item.children.length > 0) {
          removeDataFn(item.children, key);
        }
      }
    }
    removeDataFn(data,key)
  };

  const addChildDataRepeat = (data, key,columns) => {
    const newData = JSON.parse(JSON.stringify(data));
    const addChildDataFn=(data,key)=>{
      for (let i = 0, length = newData.length; i < length; i++) {
        let item = data[i];
        if (item&&(item.key === key)) {
          let _key=(+new Date()).toString()
          data[i].children = [
            ...(data[i].children || []),
            {
              key: _key
            }
          ];
          setEditingKey(_key)
          setExpandedRowKeys([...expandedRowKeys,item.key])
          data[i].columns=columns
          break
        } else if (item&&item.children && item.children.length > 0) {
          addChildDataFn(item.children, key);
        }
      }
    }
    addChildDataFn(data, key)
  };
  const saveDataRepeat = (data, key,record) => {
    const newData = JSON.parse(JSON.stringify(data));
    const saveData=(data, key)=>{
      for (let i = 0, length = newData.length; i < length; i++) {
        let item = data[i];
        if (item&&(item.key === key)) {
          data.splice(i, 1, {
            ...item,
            ...record
          });
        } else if (item&&item.children && item.children.length > 0) {
          saveData(item.children, key);
        }
      }
    }
    saveData(data, key)
  };


  // 增加同级数据
  const addData = item => {
    form.resetFields();
    setData(() => {
      const newData = JSON.parse(JSON.stringify(editData));
      let columns=tableHeaderConfig[getLevelByKeyInTree(newData,'key', item.key).length-1]
      let obj={}
      if(columns){
        columns.forEach(it=>{
          obj[it.key]=null
        })
      }
      addDataRepeat(newData, item.key,obj);
      return newData;
    });
  };
  // 取消编辑
  const cancel = () => {
    setEditingKey("");
  };
  // 增加子级数据
  const addChildData = item => {
    form.resetFields();
    const newData = JSON.parse(JSON.stringify(editData));
    setData(() => {
      let columns=tableHeaderConfig[getLevelByKeyInTree(newData,'key', item.key).length]
      if(!columns){
        message.warning(`仅配置了${tableHeaderConfig.length}层表格`)
        return newData;
      }
      addChildDataRepeat(newData, item.key,columns);
      return newData;
    });
  };
  // 删除数据
  const removeData = item => {
    setData(() => {
      const newData = JSON.parse(JSON.stringify(editData));
      if(newData.length===1&&item.key===newData[0].key){
        message.warning(`不可删除唯一的一条数据`)
        return newData
      }
      removeDataRepeat(newData, item.key);
      return newData;
    });
  };
  // 保存数据
  const save = async record => {
    try{
      const row=await form.validateFields()
      const newRecord={...row,key:record.key}
      const newData = JSON.parse(JSON.stringify(editData));
      saveDataRepeat(newData,record.key,newRecord)
      setEditingKey("");
      setData(newData);
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  // 编辑
  const edit = record => {
    form.setFieldsValue({
      ...record
    });
    setEditingKey(record.key);
  };
  // 展开行
  const onExpandedRowsChange=(key)=>{
    console.log('ExpandedRowKeys',key)
    setExpandedRowKeys(key)
  }
  //展开渲染函数
  const expandedRowRender = record => {
    const columns = [
      ...(record.columns || []),
      {
        title: "操作",
        key: "operation",
        render: (e, record) => {
          return (
            <div>
              {editingKey !== "" ? (
                <span>
                  <Button
                    type="primary"
                    disabled={editingKey !== record.key}
                    onClick={(e) => {
                      e.stopPropagation()
                      save(record)
                    }}
                  >
                    保存
                  </Button>
                  <Button
                    type="ghost"
                    disabled={editingKey !== record.key}
                    onClick={() => cancel()}
                  >
                    取消
                  </Button>
                </span>
              ) : (
                <span>
                  <Button type="primary" onClick={() => addData(record)}>增加同级</Button>
                  <Button type="ghost" onClick={() => addChildData(record)}>增加子级</Button>
                  <Button type="danger" onClick={() => removeData(record)}>删除</Button>
                </span>
              )}
            </div>
          );
        }
      }
    ];
    return (
      <Form form={form} component={false}>
      <Table
        columns={mergedColumns(columns)}
        dataSource={record.children}
        pagination={false}
        bordered="true"
        components={{
          body: {
            cell: EditableCell
          }
        }}
        childrenColumnName={['son']}
        expandable={{
          rowExpandable: record => {
            return record.children && record.children.length ? true : false;
          },
          expandedRowRender,
          expandedRowKeys,
          onExpandedRowsChange
        }}
        onRow={record => {
          return {
            onDoubleClick: event => {
              event.stopPropagation()
              form.resetFields();
              edit(record);
            }
          };
        }}
      />
      </Form>
    );
  };
  // 可编辑列
  const mergedColumns = _columns =>_columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: record => {
        return {
          record,
          inputType: "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record)
        }
      }
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        className="components-table-demo-nested"
        bordered="true"
        components={{
          body: {
            cell: EditableCell
          }
        }}
        childrenColumnName={['son']}
        columns={mergedColumns(columns)}
        expandable={{
          rowExpandable: record => {
            return record.children && record.children.length ? true : false;
          },
          expandedRowRender,
          expandedRowKeys,
          onExpandedRowsChange
        }}

        dataSource={editData}
        onRow={record => {
          return {
            onDoubleClick: event => {
              event.stopPropagation()
              form.resetFields();
              edit(record);
            }
          };
        }}
      />
    </Form>
  );
};

export default memo(NestedTable);

export default {
  data: null,
  win: [
    {
      id: "menu",
      title: "_",
      top: 0,
      left: 8,
      width: 100,
      height: "80%",
      show: false,
      resizable: false,
      maximizable: false,
      // class: "em-menu-window",
      class: "em-table-window",
      component: "em_menu",
      component_data: {}
    },
    {
      id: "role_manage",
      title: "角色管理",
      top: "calc((100% - 500px)/2)",
      left: "calc((100% - 800px)/2)",
      width: 800,
      height: 500,
      class: "em-table-window",
      show: false,
      component: "sole_table",
      component_data: {
        operation: [
          {
            id: "role_manage_input_roleCname",
            type: "em_input",
            placeholder: "中文名",
            params: "roleCname"
          },
          {
            id: "role_manage_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "role_manage_table",
            fn: "search"
          },
          {
            id: "role_manage_button_add",
            type: "em_button",
            icon: "el-icon-plus",
            operate: "添加",
            control_id: "role_manage_table",
            fn: "add",
            url: "/user/role/addRole"
          },
          {
            id: "role_manage_button_modify",
            type: "em_button",
            icon: "el-icon-edit",
            operate: "修改",
            control_id: "role_manage_table",
            fn: "modify",
            url: "/user/role/updateRole"
          },
          {
            id: "role_manage_button_dele",
            type: "em_button",
            icon: "el-icon-delete",
            operate: "删除",
            control_id: "role_manage_table",
            fn: "dele",
            url: "/user/role/dele"
          }
        ],
        table: {
          id: "role_manage_table",
          table_url: "/user/role/queryPage",
          after_digital_button_width: "160px",
          after_digital_button: [
            {
              name: "权限分配",
              fn: "permissionAssignments",
              id: "permissionAssignments",
              dialog_name: "分配权限",
              dialog_width: "400px",
              component_name: "permission_assignments"
            },
            {
              name: "关联用户",
              fn: "associateUsers",
              id: "associateUsers",
              dialog_name: "关联用户",
              dialog_width: "600px",
              component_name: "associate_users"
            }
          ],
          label: [
            {
              name: "英文名",
              prop: "roleEname",
              width: "100",
              type: "em_input",
              placeholder: "英文名",
              params: "roleEname",
              alter_show: true,
              add_show: true
            },
            {
              name: "中文名",
              prop: "roleCname",
              width: "100",
              type: "em_input",
              placeholder: "中文名",
              params: "roleCname",
              alter_show: true,
              add_show: true
            },

            {
              name: "角色编码",
              prop: "roleCode",
              width: "80",
              type: "em_input",
              placeholder: "角色编码",
              params: "roleCode",
              alter_show: true,
              add_show: true
            },
            {
              name: "备注",
              prop: "remark",
              width: "80",
              type: "em_input",
              placeholder: "备注",
              params: "remark",
              alter_show: true,
              add_show: true
            }
          ]
        }
      }
    },
    {
      id: "system_record",
      title: "系统日志",
      top: "calc((100% - 500px)/2)",
      left: "calc((100% - 900px)/2)",
      width: 900,
      height: 500,
      class: "em-table-window",
      show: false,
      component: "sole_table",
      component_data: {
        operation: [
          {
            id: "system_record_date",
            type: "em_date",

          },
          {
            id: "system_record_input_loginName",
            type: "em_input",
            placeholder: "用户名",
            params: "userCname"
          },
          {
            id: "system_record_input_methodName",
            type: "em_input",
            placeholder: "操作",
            params: "methodName"
          },
          {
            type: "em_input",
            placeholder: "请求地址",
            params: "requestUrl"
          },
          {
            id: "system_record_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            fn: "search",
            url: "/logs/select",
            control_id: "system_record_table",
          }
        ],
        table: {
          id: "system_record_table",
          table_url: "/logs/select",
          label: [
            {
              name: "用户名",
              prop: "loginName",
              width: "100"
            },
            {
              name: "操作",
              prop: "methodName",
              width: "120"
            },
            {
              name: "操作内容",
              prop: "operateContent",
              width: "200"
            },
            {
              name: "请求IP",
              prop: "requestIp",
              width: "120"
            },
            {
              name: "请求地址",
              prop: "requestUrl",
              width: "180"
            },
            {
              name: "生成时间",
              prop: "syslogTime",
              width: "140"
            },
          ]
        }
      }
    },
    {
      id: "account_manage",
      title: "账户管理",
      top: "calc((100% - 500px)/2)",
      left:"calc((100% - 800px)/2)",
      width: 800,
      height: 500,
      show: false,
      class: "em-table-window",
      component: "sole_table",
      component_data: {
        operation: [
          {
            id: "account_manage_select",
            type: "complex_em_input",
            select: [
              {
                name: "帐户",
                params: "accountNumber"
              },
              {
                name: "英文名",
                params: "userEname"
              },
              {
                name: "中文名",
                params: "userCname"
              },
            ]

          },
          {
            id: "account_manage_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "account_manage_table",
            fn: "search"
          },
          {
            id: "account_manage_button_add",
            type: "em_button",
            icon: "el-icon-plus",
            operate: "添加",
            control_id: "account_manage_table",
            fn: "add",
            url: "/user/userext/addPeopleInfo"
          },
          {
            id: "account_manage_button_modify",
            type: "em_button",
            icon: "el-icon-edit",
            operate: "修改",
            control_id: "account_manage_table",
            fn: "modify",
            url: "/user/userext/updatePeopleInfo"


          },
          {
            id: "account_manage_button_dele",
            type: "em_button",
            icon: "el-icon-delete",
            operate: "删除",
            control_id: "account_manage_table",
            fn: "dele",
            url: "/user/userext/deletePeopleInfo"
          },
          {
            id: "account_manage_button_import",
            type: "em_button",
            icon: "el-icon-excel_in",
            operate: "导入excel",
            fn: "import",
            control_id: "account_manage_table",
            download_url: "/user/userext/downCsvmodel",
            import_url: "/user/userext/ajaxUpload"
          },
          {
            id: "account_manage_button_export",
            type: "em_button",
            icon: "el-icon-excel_out",
            operate: "导出excel",
            control_id: "account_manage_table",
            fn: "export",
            url: "/user/userext/exportCsv"
          }
        ],
        table: {
          id: "account_manage_table",
          after_digital_button_width: "160px",
          after_digital_button: [
            {
              name: "重置密码",
              fn: "resetPasswordBox",
              id: "resetPassword",
              dialog_name: "重置密码",
              dialog_width: "",
              component_name: ""
            },
            {
              name: "角色分配",
              fn: "roleAssignments",
              id: "roleAssignments",
              dialog_name: "分配角色",
              dialog_width: "400px",
              component_name: "role_assignments"
            }
          ],
          table_url: "/user/userext/queryUserExt",
          label: [
            {
              name: "账户",
              prop: "accountNumber",
              width: "100",
              type: "em_input",
              reg: /[0-9a-zA-Z]/,
              erroMessage: "",
              placeholder: "账户",
              params: "accountNumber",
              alter_show: true,
              add_show: true,
              alter_readonly: true,
              add_readonly: false
            },
            {
              name: "中文名",
              prop: "userCname",
              width: "100",
              type: "em_input",
              reg: "",
              erroMessage: "",
              placeholder: "中文名",
              params: "userCname",
              alter_show: true,
              add_show: true
            },
            {
              name: "英文名",
              prop: "userEname",
              width: "100",
              type: "em_input",
              reg: "",
              erroMessage: "",
              placeholder: "英文名",
              params: "userEname",
              alter_show: true,
              add_show: true
            },
            {
              name: "状态",
              prop: "userStateCvalue",
              width: "80",
              type: "em_selectUrl",
              reg: "",
              erroMessage: "",
              params: "userState",
              optionUrl: "/user/userext/queryUserStateinfo",
              alter_show: true,
              add_show: true
            },
            {
              name: "性别",
              prop: "userSexCvalue",
              width: "80",
              type: "em_selectUrl",
              reg: "",
              erroMessage: "",
              placeholder: "性别",
              params: "userSex",
              optionUrl: "/user/userext/queryUserSexinfo",
              alter_show: true,
              add_show: true

            },
            {
              name: "电话",
              prop: "phoneNumber",
              width: "140",
              type: "em_input",
              reg: "/[0-9a-zA-Z]/",
              erroMessage: "",
              placeholder: "电话",
              params: "phoneNumber",
              alter_show: true,
              add_show: true
            },
            {
              name: "年龄",
              prop: "userAge",
              width: "80",
              type: "em_input",
              reg: "",
              erroMessage: "",
              placeholder: "年龄",
              params: "userAge",
              alter_show: true,
              add_show: true
            },
            {
              name: "组织机构",
              prop: "orgName",
              width: "80",
              type: "em_selectUrl",
              reg: "",
              erroMessage: "",
              placeholder: "部门",
              params: "organizationId",
              optionUrl: "/user/organization/queryAll",
              alter_show: true,
              add_show: true
            },
            {
              name: "人员类型",
              prop: "userTypeCvalue",
              width: "180",
              type: "em_selectUrl",
              reg: "",
              erroMessage: "",
              placeholder: "人员类型",
              params: "userType",
              optionUrl: "/user/userext/queryUserTypeinfo",
              alter_show: false,
              add_show: true
            }
          ]
        }
      }


    },
    {
      id: "time_detective",
      title: "实时监测",
      top: "8px",
      left: "calc((100% - 880px)/2)",
      width: 880,
      show: false,
      class: "em-table-window",
      component: "emCharts",
      component_data: {
        charts: [
          {
            id: "fire_alert_anaysis_chart_0",
            type: "line",
            optionType: "option_bar_line",
            winSpan: 24,
            height: 50,
            chartTitle: "火险总数统计",
            unit_y: "次",
            dataUrl: '/gardens/firealarminfo/queryAll',
            seriesType: "lineBar_handle_a",
            legendField: "createDate",
            xAxisField: "createDate",
            yAxisField: "createDate"
          },
          {
            id: "fire_alert_anaysis_chart_1",
            type: "bar",
            optionType: "option_bar_line",
            winSpan: 24,
            height: 50,
            chartTitle: "火险总数统计",
            unit_y: "次",
            dataUrl: '/gardens/firealarminfo/queryAll',
            seriesType: "lineBar_handle_a",
            legendField: "createDate",
            xAxisField: "createDate",
            yAxisField: "createDate"
          },
          {
            id: "fire_alert_anaysis_chart_2",
            type: "line",
            optionType: "option_bar_line",
            winSpan: 24,
            height: 50,
            chartTitle: "监测点报警统计",
            unit_y: "次",
            dataUrl: '/gardens/firealarminfo/queryAll',
            seriesType: "lineBar_handle_a",
            legendField: "fireAlarmId",
            xAxisField: "createDate",
            yAxisField: "createDate"
          },
          {
            id: "fire_alert_anaysis_chart_3",
            type: "line",
            optionType: "option_bar_line",
            winSpan: 24,
            height: 50,
            chartTitle: "监测点报警统计",
            unit_y: "次",
            dataUrl: '/gardens/firealarminfo/queryAll',
            seriesType: "lineBar_handle_a",
            legendField: "fireAlarmId",
            xAxisField: "createDate",
            yAxisField: "createDate"
          }
        ]
      }
    },
    {
      id: "oil_detetive",
      title: "土壤监测",
      top: 80,
      left: 400,
      show: false,
      class: "em-table-window",
      component: "test",
      component_data: {
        name: ""
      }
    },
    {
      id: "population_detective",
      title: "人流量监测",
      top: 80,
      left: 400,
      class: "em-table-window",
      show: false,
      component: "test",
      component_data: {
        name: ""
      }
    },
    {
      id: "air_detective",
      title: "空气监测",
      top: 80,
      left: 400,
      show: false,
      class: "em-table-window",
      component: "test",
      component_data: {
        name: ""
      }
    },
    {
      id: "fire_alert",
      title: "火灾报警",
      top: 80,
      left: 400,
      show: false,
      class: "em-table-window",
      component: "test",
      component_data: {
        name: ""
      }
    },
    {
      id: "grid_scope",
      title: "网格范围",
      top: 80,
      left: 400,
      show: false,
      width: 800,
      class: "em-table-window",
      component: "sole_table",
      component_data: {
        operation: [
          {
            id: "grid_scope_date",
            type: "em_date",

          },
          {
            id: "grid_scope_input_userCname",
            type: "em_input",
            placeholder: "用户名",
            params: "userCname"
          },
          {
            id: "grid_scope_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            fn: "search",
            url: "http://localhost:5000",
            control_id: "grid_scope_table",
          }
        ],
        table: {
          id: "grid_scope_table",
          table_url: "http://localhost:5000/db",
          label: [
            {
              name: "名称",
              prop: "grid_name",
              width: "100"
            },
            {
              name: "网格id",
              prop: "grid_id",
              width: "120"
            },
            {
              name: "网格位置",
              prop: "grid_position",
              width: "200"
            },
            {
              name: "备注",
              prop: "memo",
              width: "120"
            }


          ]
        }
      }
    },
    {
      id: "protect_company",
      title: "养护单位",
      top: 80,
      left: 400,
      height: 400,
      show: false,
      class: "em-table-window",
      component: "sole_table",
      component_data: {}
    },
    {
      id: "road_address",
      title: "道路地址",
      top: "calc((100% - 500px)/2)",
      left:"calc((100% - 800px)/2)",
      width: 800,
      height: 500,
      show: false,
      class: "em-table-window",
      component: "sole_table",
      component_data: {
        operation: [
          {
            id: "road_address_input_shortName",
            type: "complex_em_input",
            select: [
              {
                name: "道路名称",
                params: "roadName"
              },
              {
                name: "道路介绍",
                params: "roadDescription"
              }
            ]

          },
          {
            id: "road_address_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "road_address_table",
            fn: "search"
          },
          {
            id: "road_address_button_add",
            type: "em_button",
            icon: "el-icon-plus",
            operate: "添加",
            control_id: "road_address_table",
            fn: "add",
            url: "/gardens/road/add"
          },
          {
            id: "road_address_button_dele",
            type: "em_button",
            icon: "el-icon-delete",
            operate: "删除",
            control_id: "road_address_table",
            fn: "dele",
            url: "/gardens/road/deletes"
          }
        ],
        table: {
          id: "road_address_table",
          table_url: "/gardens/road/queryAllByPage",
          label: [{
            name: "道路名称",
            prop: "roadName",
            width: "140",
            type: "em_input",
            params: "roadName",
            placeholder: "道路名称",
            alter_show: true,
            add_show: true

          },
            {
              name: "道路介绍",
              prop: "roadDescription",
              width: "400",
              type: "em_textarea",
              params: "roadDescription",
              placeholder: "道路介绍",
              alter_show: true,
              add_show: true
            }


          ]
        }

      }
    },
    {
      id: "protect_plan",
      title: "养护计划",
      top: "calc((100% - 500px)/2)",
      left:"calc((100% - 1000px)/2)",
      width: 1000,
      height: 500,
      show: false,
      class: "em-table-window",
      component: "list_table",
      component_data: {
        list: {
          id: "protect_plan_list",
          data: [
            {name: "肥料种类管理", id: "fertilizer_type_manage"},
            {name: "肥料调动记录", id: "fertilizer_mobility_record"},
            {name: "施肥规格", id: "fertilization_specification_info"},
            {name: "施肥计划", id: "fertilization_program"}
          ]
        },
        fertilizer_type_manage: {
          operation: [
            {
              id: "fertilizer_type_manage_select",
              type: "em_input",
              placeholder: "肥料名称",
              params: "fertilizerName"

            },
            {
              id: "fertilizer_type_manage_button_search",
              type: "em_button",
              icon: "el-icon-search",
              operate: "查询",
              control_id: "fertilizer_type_manage_table",
              fn: "search"
            },
            {
              id: "fertilizer_type_manage_button_add",
              type: "em_button",
              icon: "el-icon-plus",
              operate: "添加",
              control_id: "fertilizer_type_manage_table",
              fn: "add",
              url: "/gardens/fertilizerinfo/add"
            },
            {
              id: "fertilizer_type_manage_button_modify",
              type: "em_button",
              icon: "el-icon-edit",
              operate: "修改",
              control_id: "fertilizer_type_manage_table",
              fn: "modify",
              url: "/gardens/fertilizerinfo/update"
            },
            {
              id: "fertilizer_type_manage_button_dele",
              type: "em_button",
              icon: "el-icon-delete",
              operate: "删除",
              control_id: "fertilizer_type_manage_table",
              fn: "dele",
              url: "/gardens/fertilizerinfo/deletes"
            },

          ],
          table: {
            id: "fertilizer_type_manage_table",
            table_url: "/gardens/fertilizerinfo/queryAllByPage",
            label: [
              {
                name: "肥料名称",
                prop: "fertilizerName",
                width: "80",
                type: "em_input",
                placeholder: "肥料名称",
                params: "fertilizerName",
                alter_show: true,
                add_show: true
              },
              {
                name: "化学式",
                prop: "fertilizerEname",
                width: "80",
                type: "em_input",
                placeholder: "化学式",
                params: "fertilizerEname",
                alter_show: true,
                add_show: true
              },
              {
                name: "库存(kg)",
                prop: "stock",
                width: "80",
                type: "em_input",
                placeholder: "库存",
                params: "stock",
                alter_show: true,
                add_show: true
              },
              {
                name: "描述",
                prop: "remark",
                width: "200",
                type: "em_textarea",
                placeholder: "描述",
                params: "remark",
                alter_show: true,
                add_show: true
              },
            ]
          }
        },
        fertilizer_mobility_record: {
          operation: [
            {
              id: "fertilizer_mobility_record_select",
              type: "em_input",
              placeholder: "肥料名称",
              params: "fertilizerName"

            },
            {
              id: "fertilizer_mobility_record_date",
              type: "em_date",

            },
            {
              id: "fertilizer_mobility_record_button_search",
              type: "em_button",
              icon: "el-icon-search",
              operate: "查询",
              control_id: "fertilizer_mobility_record_table",
              fn: "search"
            },
            {
              id: "fertilizer_mobility_record_button_add",
              type: "em_button",
              icon: "el-icon-plus",
              operate: "添加",
              control_id: "fertilizer_mobility_record_table",
              fn: "add",
              url: "/gardens/fertilizerRecord/add"
            },

            {
              id: "fertilizer_mobility_record_button_dele",
              type: "em_button",
              icon: "el-icon-delete",
              operate: "删除",
              control_id: "fertilizer_mobility_record_table",
              fn: "dele",
              url: "/gardens/fertilizerRecord/deletes"
            }
          ],
          table: {
            id: "fertilizer_mobility_record_table",
            table_url: "/gardens/fertilizerRecord/queryAllByPage",
            label: [{
              name: "调用者",
              prop: "executor",
              width: "80",
              alter_show: false,
              add_show: false
            },
              {
                name: "肥料名称",
                prop: "fertilizerName",
                width: "80",
                type: "em_selectUrl",
                optionUrl: "gardens/fertilizerinfo/queryAll",
                params: "fertilizerId",
                alter_show: true,
                add_show: true
              },
              {
                name: "化学式",
                prop: "fertilizerEname",
                width: "100",
                type: "em_input",
                placeholder: "化学式",
                params: "fertilizerEname",
                alter_show: false,
                add_show: false
              },
              {
                name: "数量",
                prop: "changeValue",
                width: "80",
                type: "em_input",
                placeholder: "数量",
                params: "changeValue",
                alter_show: true,
                add_show: true

              },
              {
                name: "时间",
                prop: "createDate",
                width: "180",
                type: "em_input",
                placeholder: "时间",
                params: "createDate",
                alter_show: false,
                add_show: false

              },
              {
                name: "调后库存",
                prop: "afterValue",
                width: "80",
                alter_show: false,
                add_show: false

              },
              {
                name: "备注",
                prop: "remark",
                width: "140",
                type: "em_textarea",
                placeholder: "备注",
                params: "remark",
                alter_show: true,
                add_show: true

              }

            ]
          }
        },
        fertilization_specification_info: {
          operation: [
            {
              id: "people_manage_select",
              type: "complex_em_input",
              select: [
                {
                  name: "肥料名称",
                  params: "fertilizerName"
                },
                {
                  name: "化学式",
                  params: "fertilizerEname"
                }
              ]

            },
            {
              id: "fertilization_specification_info_button_search",
              type: "em_button",
              icon: "el-icon-search",
              operate: "查询",
              control_id: "fertilization_specification_info_table",
              fn: "search"
            },
            {
              id: "fertilization_specification_info_button_add",
              type: "em_button",
              icon: "el-icon-plus",
              operate: "添加",
              control_id: "fertilization_specification_info_table",
              fn: "add",
              url: "/gardens/specificationinfo/add"
            },
            {
              id: "fertilization_specification_info_button_modify",
              type: "em_button",
              icon: "el-icon-edit",
              operate: "修改",
              control_id: "fertilization_specification_info_table",
              fn: "modify",
              url: "/gardens/specificationinfo/update"
            },
            {
              id: "fertilization_specification_info_button_dele",
              type: "em_button",
              icon: "el-icon-delete",
              operate: "删除",
              control_id: "fertilization_specification_info_table",
              fn: "dele",
              url: "/gardens/specificationinfo/deletes"
            }
          ],
          table: {
            id: "fertilization_specification_info_table",
            table_url: "/gardens/specificationinfo/queryAllByPage",
            label: [
              {
                name: "植物名称",
                prop: "plantCname",
                width: "100",
                type: "em_selectUrl",
                optionUrl: "gardens/plantname/queryexists",
                params: "plantNameId",
                alter_show: true,
                add_show: true
              },

              {
                name: "植物英文名",
                prop: "plantEname",
                width: "140",
                alter_show: false,
                add_show: false
              },
              {
                name: "肥料名称",
                prop: "fertilizerName",
                width: "140",
                type: "em_selectUrl",
                placeholder: "肥料名称",
                params: "fertilizerId",
                optionUrl: "gardens/fertilizerinfo/queryAll",
                alter_show: true,
                add_show: true
              },
              {
                name: "化学式",
                prop: "fertilizerEname",
                width: "140",
                alter_show: false,
                add_show: false
              },
              {
                name: "施肥量(kg)",
                prop: "fertilizationSpecification",
                width: "140",
                type: "em_input",
                placeholder: "施肥量(kg)",
                params: "fertilizationSpecification",
                alter_show: true,
                add_show: true

              },
              {
                name: "最大树径(cm)",
                prop: "maxSpecification",
                width: "100",
                type: "em_input",
                placeholder: "最大树径(cm)",
                params: "maxSpecification",
                alter_show: true,
                add_show: true

              },
              {
                name: "最小树径(cm)",
                prop: "minSpecification",
                width: "100",
                type: "em_input",
                placeholder: "最小树径(cm)",
                params: "minSpecification",
                alter_show: true,
                add_show: true

              },
              {
                name: "备注",
                prop: "remark",
                width: "100",
                type: "em_input",
                placeholder: "备注",
                params: "remark",
                alter_show: true,
                add_show: true

              },


            ]
          }
        },
        fertilization_program: {
          operation: [
            {
              id: "fertilization_program_input",
              type: "em_input",
              placeholder: "植物名称",
              params: "plantCname",

            },
            {
              id: "fertilization_program_date",
              type: "em_date",

            },
            {
              id: "fertilization_program_button_search",
              type: "em_button",
              icon: "el-icon-search",
              operate: "查询",
              control_id: "fertilization_program_table",
              fn: "search"
            },
            {
              id: "fertilization_program_button_add",
              type: "em_button",
              icon: "el-icon-plus",
              operate: "添加",
              control_id: "fertilization_program_table",
              fn: "add",
              url: "/gardens/fertilizationProgram/add"
            },
            {
              id: "fertilization_program_button_modify",
              type: "em_button",
              icon: "el-icon-edit",
              operate: "修改",
              control_id: "fertilization_program_table",
              fn: "modify",
              url: "/gardens/fertilizationProgram/update"
            },
            {
              id: "fertilization_program_button_dele",
              type: "em_button",
              icon: "el-icon-delete",
              operate: "删除",
              control_id: "fertilization_program_table",
              fn: "dele",
              url: "/gardens/fertilizationProgram/deletes"
            },
            {
              id: "fertilization_program_button_count",
              type: "em_button",
              icon: "el-icon-operation-tj",
              operate: "统计材料",
              control_id: "fertilization_program_table",
              fn: "coutProgram",
              url: "/gardens/fertilizationProgram/deletes"
            }
          ],
          table: {
            id: "fertilization_program_table",
            table_url: "/gardens/fertilizationProgram/queryAllByPage",
            after_digital_button: [
              {
                name: "查看规格",
                fn: "querySpecificationInfo",
                id: "querySpecificationInfo",
                dialog_name: "查看规格",
                dialog_width: "700px",
                component_name: "query_specification_info",
                label: [
                  {
                    name: "植物名称",
                    prop: "plantCname",
                    width: "100"
                  },

                  {
                    name: "植物英文名",
                    prop: "plantEname",
                    width: "140"
                  },
                  {
                    name: "肥料名称",
                    prop: "fertilizerName",
                    width: "140"
                  },
                  {
                    name: "化学式",
                    prop: "fertilizerEname",
                    width: "140"
                  },
                  {
                    name: "施肥规格",
                    prop: "fertilizationSpecification",
                    width: "140"

                  },
                  {
                    name: "最大规格",
                    prop: "maxSpecification",
                    width: "100"

                  },
                  {
                    name: "最小规格",
                    prop: "minSpecification",
                    width: "100"

                  },
                  {
                    name: "备注",
                    prop: "remark",
                    width: "100"

                  },


                ]

              },
              {
                name: "生成记录",
                fn: "executeProgram",
                id: "executeProgram",
                dialog_name: "生成记录",
                dialog_width: "560px",
                component_name: "execute_program"
              }
            ],
            label: [
              {
                name: "植物名称",
                prop: "plantCname",
                width: "100",
                type: "em_selectUrl",
                optionUrl: "gardens/plantname/queryexists",
                params: "plantNameId",
                alter_show: true,
                add_show: true
              },
              {
                name: "植物英文名",
                prop: "plantEname",
                width: "140",
                type: "em_input",
                placeholder: "植物英文名",
                params: "plantEname",
                alter_show: false,
                add_show: false
              },
              {
                name: "所用肥料",
                prop: "fertilizerNames",
                width: "100",
                type: "em_selectsUrl",
                optionUrl: "gardens/fertilizerinfo/queryAll",
                params: "fertilizerTypes",
                alter_show: true,
                add_show: true
              },
              {
                name: "时间",
                prop: "reminderTime",
                width: "180",
                type: "em_time",
                placeholder: "时间",
                params: "timeString",
                alter_show: true,
                add_show: true
              },
              {
                name: "备注",
                prop: "remark",
                width: "100",
                type: "em_input",
                placeholder: "备注",
                params: "remark",
                alter_show: true,
                add_show: true
              }
            ]
          }
        },
      }
    },
    {
      id: "protect_record",
      title: "养护记录",
      top: "calc((100% - 500px)/2)",
      left:"calc((100% - 800px)/2)",
      width: 800,
      height: 500,
      show: false,
      class: "em-table-window",
      component: "sole_table",
      component_data: {
        operation: [
          {
            id: "protect_record_select",
            type: "complex_em_input",
            select: [
              {
                name: "部门名称",
                params: "entName"
              },
              {
                name: "道路名称",
                params: "roadName"
              }
            ]

          },
          {
            id: "protect_record_date",
            type: "em_date"
          },
          {
            id: "protect_record_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "protect_record_table",
            fn: "search"
          },
          {
            id: "protect_record_button_dele",
            type: "em_button",
            icon: "el-icon-delete",
            operate: "删除",
            control_id: "protect_record_table",
            fn: "dele",
            url: "/gardens/applyFertilizerRecord/deletes"
          }
        ],
        table: {
          id: "protect_record_table",
          table_url: "/gardens/applyFertilizerRecord/queryAllByPage",
          label: [{
            name: "植物名称",
            prop: "treeName",
            width: "140",
            type: "em_input",
            params: "treeName",
            placeholder: "植物名称",
            alter_show: true,
            add_show: true

          },
            {
              name: "部门名称",
              prop: "entName",
              width: "100",
              type: "em_input",
              params: "entName",
              placeholder: "部门名称",
              alter_show: true,
              add_show: true
            },
            {
              name: "道路名称",
              prop: "roadName",
              width: "100",
              type: "em_input",
              params: "deptCode",
              placeholder: "单位编码",
              alter_show: true,
              add_show: true


            },
            {
              name: "时间",
              prop: "createDate",
              width: "200",
              type: "em_input",
              params: "createDate",
              placeholder: "时间",
              alter_show: true,
              add_show: true
            },
            {
              name: "描述",
              prop: "programmeDiscribe",
              width: "160",
              type: "em_input",
              params: "programmeDiscribe",
              placeholder: "描述",
              alter_show: true,
              add_show: true
            },
            {
              name: "备注",
              prop: "remark",
              width: "100",
              type: "em_input",
              params: "remark",
              placeholder: "备注",
              alter_show: true,
              add_show: true

            }


          ]
        }

      }
    },
    {
      id: "department_manage",
      title: "组织机构管理",
      top: "calc((100% - 500px)/2)",
      left:"calc((100% - 800px)/2)",
      width: 800,
      height: 500,
      show: false,
      class: "em-table-window",
      component: "sole_table",
      component_data: {
        operation: [
          {
            id: "department_manage_input_orgName",
            type: "em_input",
            placeholder: "机构名称",
            params: "orgName"
          },
          {
            id: "department_manage_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "department_manage_table",
            fn: "search"
          }
        ],
        table: {
          id: "department_manage_table",
          table_url: "/user/organization/queryAllByPage",
          label: [{
            name: "机构名称",
            prop: "orgName",
            width: "140",
            type: "em_input",
            params: "orgName",
            placeholder: "机构名称",
            alter_show: true,
            add_show: true

          },
            {
              name: "机构编码",
              prop: "orgNumber",
              width: "100",
              type: "em_input",
              params: "orgNumber",
              placeholder: "机构编码",
              alter_show: true,
              add_show: true
            },
            {
              name: "机构流水号",
              prop: "orgFlowno",
              width: "140",
              type: "em_input",
              params: "orgFlowno",
              placeholder: "机构流水号",
              alter_show: true,
              add_show: true
            },
            {
              name: "机构上级编码",
              prop: "orgUpCode",
              width: "140",
              type: "em_input",
              params: "orgUpCode",
              placeholder: "机构上级编码",
              alter_show: true,
              add_show: true
            },
            {
              name: "机构描述",
              prop: "orgDescript",
              width: "100",
              type: "em_input",
              params: "orgDescript",
              placeholder: "机构描述",
              alter_show: true,
              add_show: true

            }


          ]
        }

      }
    },
    {
      id: "tree_distribution",
      title: "特殊树木分布",
      top: 80,
      left: 400,
      show: false,
      class: "em-table-window",
      component: "",
      component_data: {
        name: ""
      }
    },
    {
      id: "tree_statistic",
      title: "特殊树木统计分析",
      top: "calc((100% - 700px)/2)",
      left:"calc((100% - 1000px)/2)",
      width: 1000,
      height: 700,
      show: false,
      class: "em-table-window",
      component: "echart_table",
      component_data: {
        table: {
          id: "tree_statistic_table",
          table_url: "/gardens/tree/queryAllByPage",
          label: [
            {
              name: "植物编号",
              prop: "treeNo",
              width: "140",
              type: "em_input",
              placeholder: "植物编号",
              params: "treeNo",
              alter_show: true,
              add_show: true
            },
            {
              name: "植物名称",
              prop: "treeName",
              width: "100",
              type: "em_selectUrl",
              params: "treeNameId",
              optionUrl: "gardens/tree/findplantname",
              alter_show: true,
              add_show: true
            },
            {
              name: "植物种类型",
              prop: "plantTypeName",
              width: "120",
              alter_show: false,
              add_show: false
            },
            {
              name: "植物属名称",
              prop: "genusName",
              width: "120",
              alter_show: false,
              add_show: false
            },
            {
              name: "植物科名称",
              prop: "familiesName",
              width: "120",
              alter_show: false,
              add_show: false
            },
            {
              name: "树种类型",
              prop: "treeTypeName",
              width: "120",
              alter_show: false,
              add_show: false
            },
            {
              name: "等级",
              prop: "rankValue",
              width: "80",
              type: "em_selectUrl",
              params: "rankValue",
              optionUrl: "gardens/tree/findrank",
              add_show: true,
              alter_show: true
            },
            {
              name: "高度",
              prop: "height",
              width: "80",
              type: "em_input",
              placeholder: "高度",
              params: "height",
              add_show: true,
              alter_show: true
            },
            {
              name: "海拔高度(m)",
              prop: "aboveSeaLevel",
              width: "100",
              type: "em_input",
              placeholder: "海拔高度",
              params: "aboveSeaLevel",
              add_show: true,
              alter_show: true
            },
            {
              name: "直径(cm)",
              prop: "diameter",
              width: "80",
              type: "em_input",
              placeholder: "直径",
              params: "diameter",
              add_show: true,
              alter_show: true
            },
            {
              name: "周长(cm)",
              prop: "perimeter",
              width: "80",
              type: "em_input",
              placeholder: "周长",
              params: "perimeter",
              add_show: true,
              alter_show: true
            },
            {
              name: "所在道路",
              prop: "roadName",
              width: "160",
              type: "em_selectUrl",
              params: "roadId",
              optionUrl: "gardens/road/queryAll",
              add_show: true,
              alter_show: true
            },
            // {
            //   name:"所属网格",
            //   prop:"gridName",
            //   type:"em_selectUrl",
            //   params:"gridId",
            //   optionUrl: "gardens/grid/queryAll",
            //   width:"120",
            //   add_show:true,
            //   alter_show:true
            // },
            {
              name: "行政区划",
              prop: "districtName",
              width: "120",
              type: "em_selectUrl",
              params: "districtId",
              optionUrl: "gardens/district/queryAll",
              add_show: true,
              alter_show: true
            },
            {
              name: "种植位置",
              prop: "position",
              width: "220",
              type: "em_input",
              placeholder: "直径",
              params: "position",
              add_show: true,
              alter_show: true
            },
            {
              name: "经度",
              prop: "longitude",
              width: "200",
              type: "em_input",
              placeholder: "经度",
              params: "longitude",
              add_show: true,
              alter_show: true
            },
            {
              name: "纬度",
              prop: "gpsLatitude",
              width: "200",
              type: "em_input",
              placeholder: "纬度",
              params: "gpsLatitude",
              add_show: true,
              alter_show: true
            },
            // {
            //   name:"责任人Id",
            //   prop:"personId",
            //   width:"140",
            //   type:"em_selectUrl",
            //   params:"personId",
            //   optionUrl: "gardens/person/queryAll",
            //   add_show:true,
            //   alter_show:true
            // },
            {
              name: "特征描述",
              prop: "memo",
              width: "100",
              type: "em_input",
              placeholder: "特征描述",
              params: "memo",
              add_show: true,
              alter_show: true
            }

          ]
        },
        charts: [
          {
            id: "tree_statistic_chart_1",
            type: "pie",
            optionType: "option_pie",
            winSpan: 24,
            height: 50,
            chartTitle: "道路",
            unit_y: "%",
            dataUrl: '/gardens/tree/queryAllcount?groupBy=roadName',
            seriesType: "pie_handle_b"
          },
          {
            id: "tree_statistic_chart_2",
            type: "pie",
            optionType: "option_pie",
            winSpan: 24,
            height: 50,
            chartTitle: "行政区划",
            unit_y: "%",
            dataUrl: '/gardens/tree/queryAllcount?groupBy=districtName',
            seriesType: "pie_handle_b"
          },
          {
            id: "tree_statistic_chart_3",
            type: "pie",
            optionType: "option_pie",
            winSpan: 24,
            height: 50,
            chartTitle: "植物名称",
            unit_y: "%",
            dataUrl: '/gardens/tree/queryAllcount?groupBy=treeName',
            seriesType: "pie_handle_b"
          },
          {
            id: "tree_statistic_chart_4",
            type: "pie",
            optionType: "option_pie",
            winSpan: 24,
            height: 50,
            chartTitle: "等级",
            unit_y: "%",
            dataUrl: '/gardens/tree/queryAllcount?groupBy=rankValue',
            seriesType: "pie_handle_b"
          }
        ]
      }
    },
    {
      id: "soil_temperature_analysis",
      title: "土壤温度统计分析",
      top: "calc((100% - 700px)/2)",
      left:"calc((100% - 1000px)/2)",
      width: 1000,
      height: 700,
      show: false,
      class: "em-table-window",
      component: "tabs_table",
      component_data: {
         echart_table:{
           title:'土壤温度统计分析',
           operation: [
             {
               id: "soil_temperature_analysis_date",
               type: "em_date",
             },
             {
               id: "soil_temperature_analysis_button_search",
               type: "em_button",
               icon: "el-icon-search",
               operate: "查询",
               control_id: "soil_temperature_analysis_table",
               fn: "search"
             }
           ],
           table: {
             id: "soil_temperature_analysis_table",
             table_url: "/gardens/temperature/queryAllByPage?dataType=S",
             label: [{
               name: "监测点",
               prop: "pointsId",
               width: "140",
               type: "em_input",
               params: "pointsId",
               placeholder: "全称",
               alter_show: true,
               add_show: true

             },
               {
                 name: "温度值",
                 prop: "temValue",
                 width: "100",
                 type: "em_input",
                 params: "temValue",
                 placeholder: "温度值",
                 alter_show: true,
                 add_show: true
               },
               {
                 name: "创建时间",
                 prop: "createDate",
                 width: "180",
                 type: "em_input",
                 params: "createDate",
                 placeholder: "创建时间",
                 alter_show: false,
                 add_show: false

               },
               {
                 name: "备注",
                 prop: "memo",
                 width: "140",
                 type: "em_input",
                 params: "memo",
                 placeholder: "备注",
                 alter_show: true,
                 add_show: true
               }


             ]
           },
           charts: [
             {
               id: "soil_temperature_analysis_chart_1",
               type: "line",
               optionType: "option_bar_line",
               winSpan: 24,
               height: 50,
               chartTitle: "空气湿度(最高值)",
               unit_y: "%",
               dataUrl: '/gardens/temperature/queryAll?dataType=S',
               seriesType: "lineBar_handle_a",
               valueType: "max",
               legendField: "pointsId",
               xAxisField: "createDate",
               yAxisField: "temValue"
             },
             {
               id: "soil_temperature_analysis_chart_2",
               type: "line",
               optionType: "option_bar_line",
               winSpan: 24,
               height: 50,
               chartTitle: "空气湿度(最低值)",
               unit_y: "%",
               dataUrl: '/gardens/temperature/queryAll?dataType=S',
               seriesType: "lineBar_handle_a",
               valueType: "min",
               legendField: "pointsId",
               xAxisField: "createDate",
               yAxisField: "temValue"
             },
             {
               id: "soil_temperature_analysis_chart_3",
               type: "line",
               optionType: "option_bar_line",
               winSpan: 48,
               height: 30,
               chartTitle: "空气湿度(平均值)",
               unit_y: "%",
               dataUrl: '/gardens/temperature/queryAll?dataType=S',
               seriesType: "lineBar_handle_a",
               valueType: "mean",
               legendField: "pointsId",
               xAxisField: "createDate",
               yAxisField: "temValue"
             }
           ]
         },
         sole_table:{
          title:'土壤温度报警统计',
          operation: [
            {
              id: "soil_temperature_alarm_analysis_date",
              type: "em_date",
            },
            {
              id: "soil_temperature_alarm_analysis_button_search",
              type: "em_button",
              icon: "el-icon-search",
              operate: "查询",
              control_id: "soil_temperature_alarm_analysis_table",
              fn: "search"
            }
          ],
          table: {
            id: "soil_temperature_alarm_analysis_table",
            table_url: "/gardens/warningrecord/queryAllByPage?warningType='SH'",
            label: [{
              name: "关联设备号",
              prop: "relevanceId",
              width: "100",
              type: "em_input",
              params: "relevanceId",
              placeholder: "关联设备号",
              alter_show: true,
              add_show: true

            },
              {
                name: "报警值",
                prop: "warningValue",
                width: "100",
                type: "em_input",
                params: "warningValue",
                placeholder: "报警值",
                alter_show: true,
                add_show: true
              },
              {
                name: "描述地址",
                prop: "describeAdress",
                width: "140",
                type: "em_input",
                params: "describeAdress",
                placeholder: "描述地址",
                alter_show: true,
                add_show: true
              },
              {
                name: "发生时间",
                prop: "createDate",
                width: "140",
                type: "em_input",
                params: "createDate",
                placeholder: "发生时间",
                alter_show: true,
                add_show: true

              },
              {
                name: "备注",
                prop: "remark",
                width: "120",
                type: "em_input",
                params: "remark",
                placeholder: "备注",
                alter_show: true,
                add_show: true
              }



            ]
          }
        }
      }
    },
    {
      id: "soil_humidity_analysis",
      title: "土壤湿度统计分析",
      top: "calc((100% - 700px)/2)",
      left:"calc((100% - 1000px)/2)",
      width: 1000,
      height: 700,
      show: false,
      class: "em-table-window",
      component: "echart_table",
      component_data: {
         echart_table:{
           operation: [
             {
               id: "soil_temperature_analysis_date",
               type: "em_date",

             },
             {
               id: "soil_humidity_analysis_button_search",
               type: "em_button",
               icon: "el-icon-search",
               operate: "查询",
               control_id: "soil_humidity_analysis_table",
               fn: "search"
             }
           ],
           table: {
             id: "soil_humidity_analysis_table",
             table_url: "/gardens/humidity/queryAllByPage?dataType=S",
             label: [{
               name: "监测点",
               prop: "pointsId",
               width: "140",
               type: "em_input",
               params: "pointsId",
               placeholder: "全称",
               alter_show: true

             },
               {
                 name: "湿度值",
                 prop: "humValue",
                 width: "100",
                 type: "em_input",
                 params: "humValue",
                 placeholder: "温度值",
                 alter_show: true
               },
               {
                 name: "创建时间",
                 prop: "createDate",
                 width: "180",
                 type: "em_input",
                 params: "createDate",
                 placeholder: "创建时间",
                 alter_show: true

               },
               {
                 name: "备注",
                 prop: "memo",
                 width: "140",
                 type: "em_input",
                 params: "memo",
                 placeholder: "备注",
                 alter_show: true
               }


             ]
           },
           charts: [
             {
               id: "soil_humidity_analysis_chart_1",
               type: "line",
               optionType: "option_bar_line",
               winSpan: 24,
               height: 50,
               chartTitle: "空气湿度(最高值)",
               unit_y: "%",
               dataUrl: '/gardens/humidity/queryAll?dataType=S',
               seriesType: "lineBar_handle_a",
               valueType: "max",
               legendField: "pointsId",
               xAxisField: "createDate",
               yAxisField: "humValue"
             },
             {
               id: "soil_humidity_analysis_chart_2",
               type: "line",
               optionType: "option_bar_line",
               winSpan: 24,
               height: 50,
               chartTitle: "空气湿度(最低值)",
               unit_y: "%",
               dataUrl: '/gardens/humidity/queryAll?dataType=S',
               seriesType: "lineBar_handle_a",
               valueType: "min",
               legendField: "pointsId",
               xAxisField: "createDate",
               yAxisField: "humValue"
             },
             {
               id: "soil_humidity_analysis_chart_3",
               type: "line",
               optionType: "option_bar_line",
               winSpan: 48,
               height: 30,
               chartTitle: "空气湿度(平均值)",
               unit_y: "%",
               dataUrl: '/gardens/humidity/queryAll?dataType=S',
               seriesType: "lineBar_handle_a",
               valueType: "mean",
               legendField: "pointsId",
               xAxisField: "createDate",
               yAxisField: "humValue"
             }
           ]
         },
         sole_table:{
          title:'土壤湿度报警统计',
          operation: [
            {
              id: "soil_humidity_alarm_analysis_date",
              type: "em_date",
            },
            {
              id: "soil_humidity_alarm_analysis_button_search",
              type: "em_button",
              icon: "el-icon-search",
              operate: "查询",
              control_id: "soil_humidity_alarm_analysis_table",
              fn: "search"
            }
          ],
          table: {
            id: "soil_humidity_alarm_analysis_table",
            table_url: "/gardens/warningrecord/queryAllByPage?warningType='SH'",
            label: [{
              name: "关联设备号",
              prop: "relevanceId",
              width: "100",
              type: "em_input",
              params: "relevanceId",
              placeholder: "关联设备号",
              alter_show: true,
              add_show: true

            },
              {
                name: "报警值",
                prop: "warningValue",
                width: "100",
                type: "em_input",
                params: "warningValue",
                placeholder: "报警值",
                alter_show: true,
                add_show: true
              },
              {
                name: "描述地址",
                prop: "describeAdress",
                width: "140",
                type: "em_input",
                params: "describeAdress",
                placeholder: "描述地址",
                alter_show: true,
                add_show: true
              },
              {
                name: "发生时间",
                prop: "createDate",
                width: "140",
                type: "em_input",
                params: "createDate",
                placeholder: "发生时间",
                alter_show: true,
                add_show: true

              },
              {
                name: "备注",
                prop: "remark",
                width: "120",
                type: "em_input",
                params: "remark",
                placeholder: "备注",
                alter_show: true,
                add_show: true
              }



            ]
          }
        }
      }
    },
    {
      id: "population_analysis",
      title: "人流量统计分析",
      top: "calc((100% - 700px)/2)",
      left:"calc((100% - 1000px)/2)",
      width: 1000,
      height: 700,
      show: false,
      class: "em-table-window",
      component: "echart_table",
      component_data: {
        operation: [
          {
            id: "population_analysis_date",
            type: "em_date",

          },
          {
            id: "population_analysis_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "population_analysis_table",
            fn: "search"
          }
        ],
        table: {
          id: "population_analysis_table",
          table_url: "/gardens/humantrafficinfo/queryAllByPage",
          label: [{
            name: "监测点",
            prop: "humanTrafficId",
            width: "140",
            type: "em_input",
            params: "humanTrafficId",
            placeholder: "监测点",
            alter_show: true

          },
            {
              name: "人流量信息",
              prop: "humanTrafficValue",
              width: "100",
              type: "em_input",
              params: "humanTrafficValue",
              placeholder: "humanTrafficValue",
              alter_show: true
            },
            {
              name: "创建时间",
              prop: "createDate",
              width: "180",
              type: "em_input",
              params: "createDate",
              placeholder: "创建时间",
              alter_show: true

            },
            {
              name: "备注",
              prop: "memo",
              width: "140",
              type: "em_input",
              params: "memo",
              placeholder: "备注",
              alter_show: true
            }


          ]
        },
        charts: [
          {
            id: "population_analysis_chart_1",
            type: "line",
            optionType: "option_bar_line",
            winSpan: 24,
            height: 50,
            chartTitle: "人流量(最高值)",
            unit_y: "人次",
            dataUrl: '/gardens/humantrafficinfo/queryAll',
            seriesType: "lineBar_handle_a",
            valueType: "max",
            legendField: "humanTrafficId",
            xAxisField: "createDate",
            yAxisField: "humanTrafficValue"
          },
          {
            id: "population_analysis_chart_2",
            type: "line",
            optionType: "option_bar_line",
            winSpan: 24,
            height: 50,
            chartTitle: "人流量(最低值)",
            unit_y: "人次",
            dataUrl: '/gardens/humantrafficinfo/queryAll',
            seriesType: "lineBar_handle_a",
            valueType: "min",
            legendField: "humanTrafficId",
            xAxisField: "createDate",
            yAxisField: "humanTrafficValue"
          },
          {
            id: "population_analysis_chart_3",
            type: "line",
            optionType: "option_bar_line",
            winSpan: 24,
            height: 50,
            chartTitle: "人流量(平均数)",
            unit_y: "人次",
            dataUrl: '/gardens/humantrafficinfo/queryAll',
            seriesType: "lineBar_handle_a",
            valueType: "mean",
            legendField: "humanTrafficId",
            xAxisField: "createDate",
            yAxisField: "humanTrafficValue"
          },
          {
            id: "population_analysis_chart_4",
            type: "bar",
            optionType: "option_bar_line",
            winSpan: 24,
            height: 50,
            chartTitle: "人流量(求和)",
            unit_y: "人次",
            dataUrl: '/gardens/humantrafficinfo/queryAll',
            seriesType: "lineBar_handle_a",
            valueType: "sum",
            legendField: "humanTrafficId",
            xAxisField: "createDate",
            yAxisField: "humanTrafficValue"
          }
        ]
      }
    },
    {
      id: "air_temperature_analysis",
      title: "空气温度统计分析",
      top: "calc((100% - 700px)/2)",
      left:"calc((100% - 1000px)/2)",
      width: 1000,
      height: 700,
      show: false,
      class: "em-table-window",
      component: "echart_table",
      component_data: {
        operation: [
          {
            id: "soil_temperature_analysis_date",
            type: "em_date",

          },
          {
            id: "air_temperature_analysis_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "air_temperature_analysis_table",
            fn: "search"
          }
        ],
        table: {
          id: "air_temperature_analysis_table",
          table_url: "/gardens/temperature/queryAllByPage?dataType=A",
          label: [{
            name: "监测点",
            prop: "pointsId",
            width: "140",
            type: "em_input",
            params: "pointsId",
            placeholder: "全称",
            alter_show: true

          },
            {
              name: "温度值",
              prop: "temValue",
              width: "100",
              type: "em_input",
              params: "temValue",
              placeholder: "温度值",
              alter_show: true
            },
            {
              name: "创建时间",
              prop: "createDate",
              width: "180",
              type: "em_input",
              params: "createDate",
              placeholder: "创建时间",
              alter_show: true

            },
            {
              name: "备注",
              prop: "memo",
              width: "140",
              type: "em_input",
              params: "memo",
              placeholder: "备注",
              alter_show: true
            }


          ]
        },
        charts: [
          {
            id: "air_temperature_analysis_chart_1",
            type: "line",
            optionType: "option_bar_line",
            winSpan: 24,
            height: 50,
            chartTitle: "空气温度(最高值)",
            unit_y: "℃",
            dataUrl: '/gardens/temperature/queryAll?dataType=A',
            seriesType: "lineBar_handle_a",
            valueType: "max",
            legendField: "pointsId",
            xAxisField: "createDate",
            yAxisField: "temValue"
          },
          {
            id: "air_temperature_analysis_chart_2",
            type: "line",
            optionType: "option_bar_line",
            winSpan: 24,
            height: 50,
            chartTitle: "空气温度(最低值)",
            unit_y: "℃",
            dataUrl: '/gardens/temperature/queryAll?dataType=A',
            seriesType: "lineBar_handle_a",
            valueType: "min",
            legendField: "pointsId",
            xAxisField: "createDate",
            yAxisField: "temValue"
          },
          {
            id: "air_temperature_analysis_chart_3",
            type: "line",
            optionType: "option_bar_line",
            winSpan: 48,
            height: 30,
            chartTitle: "空气温度(平均数)",
            unit_y: "℃",
            dataUrl: '/gardens/temperature/queryAll?dataType=A',
            seriesType: "lineBar_handle_a",
            valueType: "mean",
            legendField: "pointsId",
            xAxisField: "createDate",
            yAxisField: "temValue"
          }
        ]
      }
    },
    {
      id: "air_humidity_analysis",
      title: "空气湿度统计分析",
      top: "calc((100% - 700px)/2)",
      left:"calc((100% - 1000px)/2)",
      width: 1000,
      height: 700,
      show: false,
      class: "em-table-window",
      component: "echart_table",
      component_data: {
        operation: [
          {
            id: "soil_temperature_analysis_date",
            type: "em_date",

          },
          {
            id: "air_humidity_analysis_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "air_humidity_analysis_table",
            fn: "search"
          }
        ],
        table: {
          id: "air_humidity_analysis_table",
          table_url: "/gardens/humidity/queryAllByPage?dataType=A",
          label: [{
            name: "监测点",
            prop: "pointsId",
            width: "140",
            type: "em_input",
            params: "pointsId",
            placeholder: "全称",
            alter_show: true

          },
            {
              name: "湿度值",
              prop: "humValue",
              width: "100",
              type: "em_input",
              params: "humValue",
              placeholder: "温度值",
              alter_show: true
            },
            {
              name: "创建时间",
              prop: "createDate",
              width: "180",
              type: "em_input",
              params: "createDate",
              placeholder: "创建时间",
              alter_show: true

            },
            {
              name: "备注",
              prop: "memo",
              width: "140",
              type: "em_input",
              params: "memo",
              placeholder: "备注",
              alter_show: true
            }


          ]
        },
        charts: [
          {
            id: "air_humidity_analysis_chart_1",
            type: "line",
            optionType: "option_bar_line",
            winSpan: 24,
            height: 50,
            chartTitle: "空气湿度(最高值)",
            unit_y: "%",
            dataUrl: '/gardens/humidity/queryAll?dataType=A',
            seriesType: "lineBar_handle_a",
            valueType: "max",
            legendField: "pointsId",
            xAxisField: "createDate",
            yAxisField: "humValue"
          },
          {
            id: "air_humidity_analysis_chart_2",
            type: "bar",
            optionType: "option_bar_line",
            winSpan: 24,
            height: 50,
            chartTitle: "空气湿度(最低值)",
            unit_y: "%",
            dataUrl: '/gardens/humidity/queryAll?dataType=A',
            seriesType: "lineBar_handle_a",
            valueType: "min",
            legendField: "pointsId",
            xAxisField: "createDate",
            yAxisField: "humValue"
          }
        ]
      }
    },
    {
      id: "fire_alert_anaysis",
      title: "火险报警统计分析",
      top: "calc((100% - 700px)/2)",
      left:"calc((100% - 1000px)/2)",
      width: 1000,
      height: 700,
      show: false,
      class: "em-table-window",
      component: "echart_table",
      component_data: {
        operation: [
          {
            id: "fire_alert_anaysis_date",
            type: "em_date"
          },
          {
            id: "fire_alert_anaysis_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "fire_alert_anaysis_table",
            fn: "search"
          }
        ],
        table: {
          id: "fire_alert_anaysis_table",
          table_url: "/gardens/firealarminfo/queryAllByPage",
          label: [{
            name: "监测点",
            prop: "fireAlarmId",
            width: "140",
            type: "em_input",
            params: "fireAlarmId",
            placeholder: "监测点",
            alter_show: true

          },
            {
              name: "报警等级",
              prop: "fireAlarmLevel",
              width: "100",
              type: "em_input",
              params: "fireAlarmLevel",
              placeholder: "fireAlarmLevel",
              alter_show: true
            },
            {
              name: "报警信息",
              prop: "fireAlarmValue",
              width: "100",
              type: "em_input",
              params: "fireAlarmValue",
              placeholder: "fireAlarmLevel",
              alter_show: true
            },
            {
              name: "创建时间",
              prop: "createDate",
              width: "180",
              type: "em_input",
              params: "createDate",
              placeholder: "创建时间",
              alter_show: true

            },
            {
              name: "备注",
              prop: "memo",
              width: "140",
              type: "em_input",
              params: "memo",
              placeholder: "备注",
              alter_show: true
            }
          ]
        },
        charts: [
          {
            id: "fire_alert_anaysis_chart_0",
            type: "line",
            optionType: "option_bar_line",
            winSpan: 24,
            height: 50,
            chartTitle: "火险总数统计",
            unit_y: "次",
            dataUrl: '/gardens/firealarminfo/queryAll',
            seriesType: "lineBar_handle_a",
            legendField: "createDate",
            xAxisField: "createDate",
            yAxisField: "createDate"
          },
          {
            id: "fire_alert_anaysis_chart_1",
            type: "bar",
            optionType: "option_bar_line",
            winSpan: 24,
            height: 50,
            chartTitle: "火险总数统计",
            unit_y: "次",
            dataUrl: '/gardens/firealarminfo/queryAll',
            seriesType: "lineBar_handle_a",
            legendField: "createDate",
            xAxisField: "createDate",
            yAxisField: "createDate"
          },
          {
            id: "fire_alert_anaysis_chart_2",
            type: "pie",
            optionType: "option_pie",
            winSpan: 24,
            height: 50,
            chartTitle: "监测点报警统计",
            unit_y: "%",
            dataUrl: '/gardens/firealarminfo/queryAll',
            seriesType: "pie_handle_a",
            seriesFields: "fireAlarmId"
          },
          {
            id: "fire_alert_anaysis_chart_3",
            type: "line",
            optionType: "option_bar_line",
            winSpan: 24,
            height: 50,
            chartTitle: "监测点报警统计",
            unit_y: "次",
            dataUrl: '/gardens/firealarminfo/queryAll',
            seriesType: "lineBar_handle_a",
            legendField: "fireAlarmId",
            xAxisField: "createDate",
            yAxisField: "createDate"
          }
        ]
      }
    },
    {
      id: "people_manage",
      title: "人员管理",
      top: "calc((100% - 500px)/2)",
      left:"calc((100% - 1000px)/2)",
      width: 1000,
      height: 500,
      show: false,
      class: "em-table-window",
      component: "list_table",
      component_data: {
        list: {
          id: "type_manage_list",
          data: [{name: "人员信息管理", id: "people_inform_manage"}, {name: "人员类型管理", id: "people_type_manage"}]
        },
        people_type_manage: {
          operation: [
            {
              id: "persontype_manage_select",
              type: "complex_em_input",
              select: [
                {
                  name: "类型编号",
                  params: "personTypeNo"
                },
                {
                  name: "人员类型",
                  params: "personTypeName"
                }
              ]

            },
            {
              id: "persontype_manage_button_search",
              type: "em_button",
              icon: "el-icon-search",
              operate: "查询",
              control_id: "persontype_manage_table",
              fn: "search"
            },
            {
              id: "persontype_manage_button_add",
              type: "em_button",
              icon: "el-icon-plus",
              operate: "添加",
              control_id: "persontype_manage_table",
              fn: "add",
              url: "/gardens/persontype/add"
            },
            {
              id: "persontype_manage_button_modify",
              type: "em_button",
              icon: "el-icon-edit",
              operate: "修改",
              control_id: "persontype_manage_table",
              fn: "modify",
              url: "/gardens/persontype/update"
            },
            {
              id: "persontype_manage_button_dele",
              type: "em_button",
              icon: "el-icon-delete",
              operate: "删除",
              control_id: "persontype_manage_table",
              fn: "dele",
              url: "/gardens/persontype/deletes"
            },
            {
              id: "persontype_manage_button_export",
              type: "em_button",
              control_id: "persontype_manage_table",
              icon: "el-icon-excel_out",
              operate: "导出excel",
              fn: "export",
              url: "/gardens/persontype/exportCsv"
            }
          ],
          table: {
            id: "persontype_manage_table",
            table_url: "/gardens/persontype/queryAllByPage",
            label: [
              {
                name: "类型编号",
                prop: "personTypeNo",
                width: "100",
                type: "em_input",
                placeholder: "类型编号",
                params: "personTypeNo",
                alter_show: true,
                add_show: true
              },
              {
                name: "人员类型",
                prop: "personTypeName",
                width: "100",
                type: "em_input",
                placeholder: "人员类型",
                params: "personTypeName",
                alter_show: true,
                add_show: true
              },
              {
                name: "描述",
                prop: "memo",
                width: "100",
                type: "em_input",
                placeholder: "描述",
                params: "memo",
                alter_show: true,
                add_show: true
              },
            ]
          }
        },
        people_inform_manage: {
          operation: [
            {
              id: "people_manage_select",
              type: "complex_em_input",
              select: [
                {
                  name: "姓名",
                  params: "name"
                },
                {
                  name: "职务",
                  params: "duty"
                }
              ]

            },
            {
              id: "people_manage_button_search",
              type: "em_button",
              icon: "el-icon-search",
              operate: "查询",
              control_id: "people_manage_table",
              fn: "search"
            },
            {
              id: "people_manage_button_add",
              type: "em_button",
              icon: "el-icon-plus",
              operate: "添加",
              control_id: "people_manage_table",
              fn: "add",
              url: "/gardens/person/add"
            },
            {
              id: "people_manage_button_modify",
              type: "em_button",
              icon: "el-icon-edit",
              operate: "修改",
              control_id: "people_manage_table",
              fn: "modify",
              url: "/gardens/person/update"
            },
            {
              id: "people_manage_button_dele",
              type: "em_button",
              icon: "el-icon-delete",
              operate: "删除",
              control_id: "people_manage_table",
              fn: "dele",
              url: "/gardens/person/deletes"
            },
            {
              id: "people_manage_button_import",
              type: "em_button",
              icon: "el-icon-excel_in",
              operate: "导入excel",
              control_id: "people_manage_table",
              fn: "import",
              download_url: "/gardens/person/downCsvmodel",
              import_url: "/gardens/person/ajaxUpload"
            },
            {
              id: "people_manage_button_export",
              type: "em_button",
              control_id: "people_manage_table",
              icon: "el-icon-excel_out",
              operate: "导出excel",
              fn: "export",
              url: "/gardens/person/exportCsv"
            }
          ],
          table: {
            id: "people_manage_table",
            table_url: "/gardens/person/queryAllByPage",
            label: [{
              name: "姓名",
              prop: "name",
              width: "100",
              type: "em_input",
              placeholder: "名字",
              params: "name",
              alter_show: true,
              add_show: true
            },
              {
                name: "性别",
                prop: "sex",
                width: "100",
                type: "em_select",
                params: "sex",
                options: [{
                  value: "男",
                  label: "男"
                },
                  {
                    value: "女",
                    label: "女"
                  }

                ],
                alter_show: true,
                add_show: true
              },
              {
                name: "职务",
                prop: "duty",
                width: "140",
                type: "em_input",
                placeholder: "职务",
                params: "duty",
                alter_show: true,
                add_show: true
              },
              {
                name: "人员类型",
                prop: "personTypeName",
                width: "140",
                type: "em_selectUrl",
                params: "personTypeId",
                optionUrl: "gardens/persontype/queryAll",
                alter_show: true,
                add_show: true

              },
              {
                name: "电话",
                prop: "telephone",
                width: "140",
                type: "em_input",
                placeholder: "电话",
                params: "telephone",
                alter_show: true,
                add_show: true
              },
              {
                name: "从事专业",
                prop: "professional",
                width: "140",
                type: "em_input",
                placeholder: "从事专业",
                params: "professional",
                alter_show: true,
                add_show: true
              },
              {
                name: "工作单位",
                prop: "entName",
                width: "100",
                type: "em_selectUrl",
                params: "entId",
                optionUrl: "gardens/ent/queryAll",
                alter_show: true,
                add_show: true
              },
              {
                name: "备注",
                prop: "memo",
                width: "140",
                type: "em_input",
                placeholder: "备注",
                params: "memo",
                alter_show: true,
                add_show: true

              }


            ]
          }
        }
      }

    },
    {
      id: "protect_company_manage",
      title: "养护单位管理",
      top: "calc((100% - 500px)/2)",
      left:"calc((100% - 800px)/2)",
      width: 800,
      height: 500,
      show: false,
      class: "em-table-window",
      component: "sole_table",
      component_data: {
        operation: [

          {
            id: "protect_company_manage_input_entName",
            type: "em_input",
            placeholder: "名称",
            params: "entName"
          },
          {
            id: "protect_company_manage_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "protect_company_manage_table",
            fn: "search"
          },
          {
            id: "protect_company_manage_button_add",
            type: "em_button",
            icon: "el-icon-plus",
            operate: "添加",
            control_id: "protect_company_manage_table",
            fn: "add",
            url: "/gardens/ent/add"
          },
          {
            id: "protect_company_manage_button_modify",
            type: "em_button",
            icon: "el-icon-edit",
            operate: "修改",
            control_id: "protect_company_manage_table",
            fn: "modify",
            url: "/gardens/ent/update"

          },
          {
            id: "protect_company_manage_button_dele",
            type: "em_button",
            icon: "el-icon-delete",
            operate: "删除",
            control_id: "protect_company_manage_table",
            fn: "dele",
            url: "gardens/ent/deletes"
          },
          {
            id: "protect_company_manage_button_import",
            type: "em_button",
            icon: "el-icon-excel_in",
            operate: "导入excel",
            fn: "import",
            control_id: "protect_company_manage_table",
            download_url: "/gardens/ent/downCsvmodel",
            import_url: "/gardens/ent/ajaxUpload"
          },
          {
            id: "protect_company_manage_button_export",
            type: "em_button",
            icon: "el-icon-excel_out",
            operate: "导出excel",
            control_id: "protect_company_manage_table",
            fn: "export",
            url: "/gardens/ent/exportCsv"
          }

        ],
        table: {
          id: "protect_company_manage_table",
          table_url: "/gardens/ent/queryAllByPage",
          after_digital_button_width: "80px",
          after_digital_button: [
            {
              name: "关联路段",
              fn: "associateRoads",
              id: "associateRoads",
              dialog_name: "关联路段",
              dialog_width: "600px",
              component_name: "associate_roads"
            },
            // {
            //     name: "取消关联",
            //     fn: "cancelAssociation",
            //     id: "cancelAssociation",
            // }
          ],
          label: [
            {
              name: "名称",
              prop: "entName",
              width: "100",
              type: "em_input",
              placeholder: "名称",
              params: "entName",
              alter_show: true,
              add_show: true

            },
            {
              name: "单位地址",
              prop: "orgAddr",
              width: "120",
              type: "em_input",
              placeholder: "单位地址",
              params: "orgAddr",
              alter_show: true,
              add_show: true
            },
            {
              name: "联系人",
              prop: "contactMan",
              width: "200",
              type: "em_input",
              placeholder: "联系人",
              params: "contactMan",
              alter_show: true,
              add_show: true
            },
            {
              name: "联系电话",
              prop: "tel",
              width: "120",
              type: "em_input",
              placeholder: "联系电话",
              params: "tel",
              alter_show: true,
              add_show: true
            },
            {
              name: "行政区域",
              prop: "areaCode",
              width: "160",
              type: "em_selectUrl",
              params: "areaCode",
              optionUrl: "gardens/district/queryAll",
              alter_show: true,
              add_show: true
            },
            {
              name: "注释",
              prop: "memo",
              width: "140",
              type: "em_textarea",
              placeholder: "注释",
              params: "memo",
              alter_show: true,
              add_show: true
            },


          ]
        }
      }

    },
    {
      id: "tree_type_manage",
      title: "树种类型管理",
      top: "calc((100% - 500px)/2)",
      left:"calc((100% - 800px)/2)",
      width: 800,
      height: 500,
      show: false,
      class: "em-table-window",
      component: "sole_table",
      component_data: {
        operation: [
          {
            id: "tree_type_manage_select",
            type: "complex_em_input",
            select: [
              {
                name: "类型编号",
                params: "treeTypeNo",

              },
              {
                name: "树种类型名称",
                params: "treeTypeName"
              }
            ]

          },
          {
            id: "tree_type_manage_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "tree_type_manage_table",
            fn: "search"
          },
          {
            id: "tree_type_manage_button_add",
            type: "em_button",
            icon: "el-icon-plus",
            operate: "添加",
            control_id: "tree_type_manage_table",
            fn: "add",
            url: "/gardens/treetype/add"
          },
          {
            id: "tree_type_manage_button_modify",
            type: "em_button",
            icon: "el-icon-edit",
            operate: "修改",
            control_id: "tree_type_manage_table",
            fn: "modify",
            url: "/gardens/treetype/update"
          },
          {
            id: "tree_type_manage_button_dele",
            type: "em_button",
            icon: "el-icon-delete",
            operate: "删除",
            control_id: "tree_type_manage_table",
            fn: "dele",
            url: "/gardens/treetype/deletes"
          }
        ],
        table: {
          id: "tree_type_manage_table",
          table_url: "/gardens/treetype/queryAllByPage",
          label: [
            {
              name: "类型编号",
              prop: "treeTypeNo",
              width: "140",
              type: "em_input",
              placeholder: "类型编号",
              params: "treeTypeNo",
              alter_show: true,
              add_show: true
            },
            {
              name: "树种类型名称",
              prop: "treeTypeName",
              width: "140",
              type: "em_input",
              placeholder: "树种类型名称",
              params: "treeTypeName",
              alter_show: true,
              add_show: true
            },
            {
              name: "是否特殊树种",
              prop: "isSpecial",
              width: "140",
              type: "em_select",
              options: [{
                value: 1,
                label: "是"
              },
                {
                  value: 0,
                  label: "否"
                }],
              params: "isSpecial",
              alter_show: true,
              add_show: true
            },
            {
              name: "注释",
              prop: "memo",
              width: "200",
              type: "em_textarea",
              placeholder: "注释",
              params: "memo",
              alter_show: true,
              add_show: true

            }

          ]
        }
      }
    },
    {
      id: "plant_type_manage",
      title: "植物类型管理",
      top: "calc((100% - 500px)/2)",
      left:"calc((100% - 800px)/2)",
      width: 800,
      height: 500,
      show: false,
      class: "em-table-window",
      component: "sole_table",
      component_data: {
        operation: [
          {
            id: "plant_type_manage_select",
            type: "complex_em_input",
            select: [
              {
                name: "植物分类名称",
                params: "plantTypeName",

              },
              {
                name: "植物名称",
                params: "plantCname"
              }
            ]

          },
          {
            id: "plant_type_manage_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "plant_type_manage_table",
            fn: "search"
          },
          {
            id: "plant_type_manage_button_add",
            type: "em_button",
            icon: "el-icon-plus",
            operate: "添加",
            control_id: "plant_type_manage_table",
            fn: "add",
            url: "/gardens/plantname/add"
          },
          {
            id: "plant_type_manage_button_modify",
            type: "em_button",
            icon: "el-icon-edit",
            operate: "修改",
            control_id: "plant_type_manage_table",
            fn: "modify",
            url: "/gardens/plantname/update"
          },
          {
            id: "plant_type_manage_button_dele",
            type: "em_button",
            icon: "el-icon-delete",
            operate: "删除",
            control_id: "plant_type_manage_table",
            fn: "dele",
            url: "/gardens/plantname/deletes"
          }
        ],
        table: {
          id: "plant_type_manage_table",
          table_url: "/gardens/plantname/queryAllByPage",
          picture_url: "/gardens/plantname/findImage/",
          label: [
            {
              name: "植物名称",
              prop: "plantCname",
              width: "140",
              type: "em_input",
              placeholder: "植物名称",
              params: "plantCname",
              alter_show: true,
              add_show: true
            },
            {
              name: "植物英文名",
              prop: "plantEname",
              width: "140",
              type: "em_input",
              placeholder: "植物英文名",
              params: "plantEname",
              alter_show: true,
              add_show: true
            },
            {
              name: "植物分类名称",
              prop: "plantTypeName",
              width: "140",
              type: "em_selectUrl",
              optionUrl: "gardens/planttype/queryAll",
              params: "plantTypeId",
              alter_show: true,
              add_show: true
            },
            {
              name: "树种分类名称",
              prop: "treeTypeName",
              width: "140",
              type: "em_selectUrl",
              optionUrl: "gardens/treetype/queryAll",
              params: "treeTypeId",
              alter_show: true,
              add_show: true
            },
            {
              name: "植物科名称",
              prop: "familiesName",
              width: "140",
              type: "em_input",
              placeholder: "植物科名称",
              params: "familiesName",
              alter_show: false,
              add_show: false
            },
            {
              name: "植物属名称",
              prop: "genusName",
              width: "140",
              type: "em_input",
              placeholder: "植物属名称",
              params: "genusName",
              alter_show: false,
              add_show: false
            },
            {
              name: "花卉还是树",
              prop: "flowersPlantsOrTree",
              width: "140",
              type: "em_select",
              options: [
                {
                  value: 0,
                  label: "树"
                },
                {
                  value: 1,
                  label: "花卉"
                }
              ],
              placeholder: "花卉还是树",
              params: "flowersPlantsOrTree",
              alter_show: true,
              add_show: true
            },
            {
              name: "特征",
              prop: "features",
              width: "140",
              type: "em_input",
              placeholder: "特征",
              params: "features",
              alter_show: true,
              add_show: true
            },
            {
              name: "生长习性",
              prop: "growthHabit",
              width: "140",
              type: "em_input",
              placeholder: "生长习性",
              params: "growthHabit",
              alter_show: true,
              add_show: true
            },
            {
              name: "注释",
              prop: "describeString",
              width: "300",
              type: "em_input",
              placeholder: "注释",
              params: "describeString",
              alter_show: true,
              add_show: true

            }

          ]
        }
      }
    },
    {
      id: "tree_material_manage",
      title: "特殊树木资料管理",
      top: "calc((100% - 500px)/2)",
      left:"calc((100% - 800px)/2)",
      width: 920,
      height: 500,
      show: false,
      class: "em-table-window",
      component: "sole_table",
      component_data: {
        operation: [
          {
            id: "tree_material_manage_input_treeNo",
            type: "em_input",
            placeholder: "植物编号",
            params: "treeNo"
          },
          {
            id: "tree_material_manage_input_treeName",
            type: "em_input",
            placeholder: "树种类型",
            params: "treeName"
          },
          {
            id: "tree_material_manage_input_treeName",
            type: "em_input",
            placeholder: "植物名称",
            params: "treeName"
          },
          {
            id: "tree_material_manage_input_position",
            type: "em_input",
            placeholder: "行政区划",
            params: "position"
          },
          {
            id: "tree_material_manage_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "tree_material_manage_table",
            fn: "search"
          },
          {
            id: "tree_material_manage_button_add",
            type: "em_button",
            icon: "el-icon-plus",
            operate: "添加",
            control_id: "tree_material_manage_table",
            fn: "add",
            url: "/gardens/tree/add"
          },
          {
            id: "tree_material_manage_button_modify",
            type: "em_button",
            icon: "el-icon-edit",
            operate: "修改",
            control_id: "tree_material_manage_table",
            fn: "modify",
            url: "/gardens/tree/update"
          },
          {
            id: "tree_material_manage_button_dele",
            type: "em_button",
            icon: "el-icon-delete",
            operate: "删除",
            control_id: "tree_material_manage_table",
            fn: "dele",
            url: "/gardens/tree/deletes"
          },
          {
            id: "tree_material_manage_button_export",
            type: "em_button",
            icon: "el-icon-excel_out",
            operate: "导出excel",
            fn: "export",
            control_id: "tree_material_manage_table",
            url: "/gardens/tree/exportCsv"
          }
        ],
        table: {
          id: "tree_material_manage_table",
          table_url: "/gardens/tree/queryAllByPage",
          label: [
            {
              name: "植物编号",
              prop: "treeNo",
              width: "140",
              type: "em_input",
              placeholder: "植物编号",
              params: "treeNo",
              alter_show: true,
              add_show: true
            },
            {
              name: "植物名称",
              prop: "treeName",
              width: "100",
              type: "em_selectUrl",
              params: "treeNameId",
              optionUrl: "gardens/tree/findplantname",
              alter_show: true,
              add_show: true
            },
            {
              name: "植物种类型",
              prop: "plantTypeName",
              width: "120",
              alter_show: false,
              add_show: false
            },
            {
              name: "植物属名称",
              prop: "genusName",
              width: "120",
              alter_show: false,
              add_show: false
            },
            {
              name: "植物科名称",
              prop: "familiesName",
              width: "120",
              alter_show: false,
              add_show: false
            },
            {
              name: "树种类型",
              prop: "treeTypeName",
              width: "120",
              alter_show: false,
              add_show: false
            },
            {
              name: "等级",
              prop: "rankValue",
              width: "80",
              type: "em_selectUrl",
              params: "rankValue",
              optionUrl: "gardens/tree/findrank",
              add_show: true,
              alter_show: true
            },
            {
              name: "高度",
              prop: "height",
              width: "80",
              type: "em_input",
              placeholder: "高度",
              params: "height",
              add_show: true,
              alter_show: true
            },
            {
              name: "海拔高度(m)",
              prop: "altitude",
              width: "100",
              type: "em_input",
              placeholder: "海拔高度",
              params: "altitude",
              add_show: true,
              alter_show: true
            },
            {
              name: "直径(cm)",
              prop: "diameter",
              width: "80",
              type: "em_input",
              placeholder: "直径",
              params: "diameter",
              add_show: true,
              alter_show: true
            },
            {
              name: "周长(cm)",
              prop: "perimeter",
              width: "80",
              type: "em_input",
              placeholder: "周长",
              params: "perimeter",
              add_show: true,
              alter_show: true
            },
            {
              name: "所在道路",
              prop: "roadName",
              width: "160",
              type: "em_selectUrl",
              params: "roadId",
              optionUrl: "gardens/road/queryAll",
              add_show: true,
              alter_show: true
            },
            // {
            //   name:"所属网格",
            //   prop:"gridName",
            //   type:"em_selectUrl",
            //   params:"gridId",
            //   optionUrl: "gardens/grid/queryAll",
            //   width:"120",
            //   add_show:true,
            //   alter_show:true
            // },
            {
              name: "行政区划",
              prop: "districtName",
              width: "120",
              type: "em_selectUrl",
              params: "districtId",
              optionUrl: "gardens/district/queryAll",
              add_show: true,
              alter_show: true
            },
            {
              name: "种植位置",
              prop: "position",
              width: "220",
              type: "em_input",
              placeholder: "直径",
              params: "position",
              add_show: true,
              alter_show: true
            },
            {
              name: "经度",
              prop: "longitude",
              width: "200",
              type: "em_input",
              placeholder: "经度",
              params: "longitude",
              add_show: true,
              alter_show: true
            },
            {
              name: "纬度",
              prop: "gpsLatitude",
              width: "200",
              type: "em_input",
              placeholder: "纬度",
              params: "gpsLatitude",
              add_show: true,
              alter_show: true
            },
            // {
            //   name:"责任人Id",
            //   prop:"personId",
            //   width:"140",
            //   type:"em_selectUrl",
            //   params:"personId",
            //   optionUrl: "gardens/person/queryAll",
            //   add_show:true,
            //   alter_show:true
            // },
            {
              name: "特征描述",
              prop: "memo",
              width: "100",
              type: "em_input",
              placeholder: "特征描述",
              params: "memo",
              add_show: true,
              alter_show: true
            }

          ]
        }
      }
    },
    {
      id: "grid_manage",
      title: "网格管理",
      top: "calc((100% - 500px)/2)",
      left:"calc((100% - 800px)/2)",
      width: 800,
      height: 500,
      show: false,
      class: "em-table-window",
      component: "sole_table",
      component_data: {
        operation: [
          {
            id: "grid_manage_select",
            type: "complex_em_input",
            select: [
              {
                name: "编号",
                params: "gridNo"
              },
              {
                name: "网格名称",
                params: "gridName"
              }
            ]

          },
          {
            id: "grid_manage_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "grid_manage_table",
            fn: "search"
          },
          {
            id: "grid_manage_button_add",
            type: "em_button",
            icon: "el-icon-plus",
            operate: "添加",
            control_id: "grid_manage_table",
            fn: "add",
            url: "/gardens/grid/add"
          },
          {
            id: "grid_manage_button_modify",
            type: "em_button",
            icon: "el-icon-edit",
            operate: "修改",
            control_id: "grid_manage_table",
            fn: "modify",
            url: "/gardens/grid/update"
          },
          {
            id: "grid_manage_button_dele",
            type: "em_button",
            icon: "el-icon-delete",
            operate: "删除",
            control_id: "grid_manage_table",
            fn: "dele",
            url: "gardens/grid/deletes"
          },
          {
            id: "grid_manage_button_import",
            type: "em_button",
            icon: "el-icon-excel_in",
            operate: "导入excel",
            fn: "import",
            control_id: "grid_manage_table",
            download_url: "/gardens/grid/downCsvmodel",
            import_url: "/gardens/grid/ajaxUpload"

          },
          {
            id: "grid_manage_button_export",
            type: "em_button",
            icon: "el-icon-excel_out",
            operate: "导出excel",
            fn: "export",
            control_id: "grid_manage_table",
            url: "/gardens/grid/exportCsv"
          }
        ],
        table: {
          id: "grid_manage_table",
          table_url: "/gardens/grid/queryAllByPage",
          label: [
            {
              name: "网格编号",
              prop: "gridNo",
              width: "100",
              type: "em_input",
              placeholder: "设备编号",
              params: "gridNo",
              add_show: true,
              alter_show: true
            },
            {
              name: "网格名称",
              prop: "gridName",
              width: "100",
              type: "em_input",
              placeholder: "设备名称",
              params: "gridName",
              add_show: true,
              alter_show: true

            },
            {
              name: "面积(m²）",
              prop: "gridArea",
              width: "100",
              type: "em_input",
              placeholder: "面积",
              params: "gridArea",
              add_show: true,
              alter_show: true

            },
            {
              name: "创建人姓名",
              prop: "creatorName",
              width: "140",
              type: "em_input",
              placeholder: "创建人姓名",
              params: "creatorName",
              add_show: true,
              alter_show: true
            },
            {
              name: "创建日期",
              prop: "createDate",
              width: "200",
              add_show: false,
              alter_show: false
            },
            // {
            //   name:"责任单位",
            //   prop:"entId",
            //   width:"120"
            // },
            // {
            //   name:"责任人",
            //   prop:"personId",
            //   width:"100"
            // },
            {
              name: "所属行政区域",
              prop: "areaCode",
              width: "200",
              type: "em_input",
              placeholder: "所属行政区域",
              params: "areaCode",
              add_show: true,
              alter_show: true
            },
          ]
        }
      }
    },
    {
      id: "monitor_points_manage",
      title: "监控点管理",
      top: "calc((100% - 500px)/2)",
      left:"calc((100% - 800px)/2)",
      width: 800,
      height: 500,
      show: false,
      class: "em-table-window",
      component: "sole_table",
      component_data: {
        operation: [
          {
            id: "monitor_points_manage_select",
            type: "complex_em_input",
            select: [
              {
                name: "设备编号",
                params: "monitoringPointsNo"
              },
              {
                name: "设备名称",
                params: "monitoringPointsName"
              }
            ]

          },
          {
            id: "monitor_points_manage_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "monitor_points_manage_table",
            fn: "search"
          },
          {
            id: "monitor_points_manage_button_add",
            type: "em_button",
            icon: "el-icon-plus",
            operate: "添加",
            control_id: "monitor_points_manage_table",
            fn: "add",
            url: "/gardens/monitoringpoints/add"
          },
          {
            id: "monitor_points_manage_button_modify",
            type: "em_button",
            icon: "el-icon-edit",
            operate: "修改",
            control_id: "monitor_points_manage_table",
            fn: "modify",
            url: "/gardens/monitoringpoints/update"
          },
          {
            id: "monitor_points_manage_button_dele",
            type: "em_button",
            icon: "el-icon-delete",
            operate: "删除",
            control_id: "monitor_points_manage_table",
            fn: "dele",
            url: "gardens/monitoringpoints/deletes"
          },
          {
            id: "monitor_points_manage_button_import",
            type: "em_button",
            icon: "el-icon-excel_in",
            operate: "导入excel",
            fn: "import",
            control_id: "monitor_points_manage_table",
            download_url: "/gardens/monitoringpoints/downCsvmodel",
            import_url: "/gardens/monitoringpoints/ajaxUpload"

          },
          {
            id: "monitor_points_manage_button_export",
            type: "em_button",
            icon: "el-icon-excel_out",
            operate: "导出excel",
            fn: "export",
            control_id: "monitor_points_manage_table",
            url: "/gardens/monitoringpoints/exportCsv"
          }
        ],
        table: {
          id: "monitor_points_manage_table",
          table_url: "/gardens/monitoringpoints/queryAllByPage",
          label: [
            {
              name: "设备编号",
              prop: "monitoringPointsNo",
              width: "100",
              type: "em_input",
              placeholder: "设备编号",
              params: "monitoringPointsNo",
              add_show: true,
              alter_show: true
            },
            {
              name: "设备名称",
              prop: "monitoringPointsName",
              width: "100",
              type: "em_input",
              placeholder: "设备名称",
              params: "monitoringPointsName",
              add_show: true,
              alter_show: true

            },
            {
              name: "设备型号",
              prop: "equipmentType",
              width: "100",
              type: "em_input",
              placeholder: "面积",
              params: "设备型号",
              add_show: true,
              alter_show: true

            },
            {
              name: "位置描述",
              prop: "position",
              width: "140",
              type: "em_input",
              placeholder: "位置描述",
              params: "position",
              add_show: true,
              alter_show: true
            },
            {
              name: "经度",
              prop: "longitude",
              width: "140",
              type: "em_input",
              placeholder: "经度",
              params: "longitude",
              add_show: true,
              alter_show: true
            },
            {
              name: "纬度",
              prop: "gpsLatitude",
              width: "140",
              type: "em_input",
              placeholder: "纬度",
              params: "gpsLatitude",
              add_show: true,
              alter_show: true
            },

            {
              name: "备注",
              prop: "memo",
              width: "200",
              type: "em_textarea",
              placeholder: "备注",
              params: "memo",
              add_show: true,
              alter_show: true
            },
          ]
        }
      }
    },
    {
      id: "soil_temperature_manage",
      title: "土壤温度监测点管理",
      top: "calc((100% - 500px)/2)",
      left:"calc((100% - 800px)/2)",
      width: 800,
      height: 500,
      show: false,
      class: "em-table-window",
      component: "sole_table",
      component_data: {
        operation: [
          {
            id: "soil_temperature_manage_select",
            type: "complex_em_input",
            select: [
              {
                name: "监测点名称",
                params: "pointsName"
              },
              {
                name: "编号",
                params: "pointsNo"
              }
            ]

          },
          {
            id: "soil_temperature_manage_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "soil_temperature_manage_table",
            fn: "search"
          },
          {
            id: "soil_temperature_manage_button_add",
            type: "em_button",
            icon: "el-icon-plus",
            operate: "添加",
            control_id: "soil_temperature_manage_table",
            fn: "add",
            url: "/gardens/temhumpoints/add"
          },
          {
            id: "soil_temperature_manage_button_modify",
            type: "em_button",
            icon: "el-icon-edit",
            operate: "修改",
            control_id: "soil_temperature_manage_table",
            fn: "modify",
            url: "/gardens/temhumpoints/update"
          },
          {
            id: "soil_temperature_manage_button_dele",
            type: "em_button",
            icon: "el-icon-delete",
            operate: "删除",
            control_id: "soil_temperature_manage_table",
            fn: "dele",
            url: "/gardens/temhumpoints/deletes"
          },
          {
            id: "soil_temperature_manage_button_import",
            type: "em_button",
            icon: "el-icon-excel_in",
            operate: "导入excel",
            fn: "import",
            control_id: "soil_temperature_manage_table",
            download_url: "/gardens/temhumpoints/downCsvmodel",
            import_url: "/gardens/temhumpoints/ajaxUpload"
          },
          {
            id: "soil_temperature_manage_button_export",
            type: "em_button",
            icon: "el-icon-excel_out",
            operate: "导出excel",
            fn: "export",
            control_id: "soil_temperature_manage_table",
            url: "/gardens/temhumpoints/exportCsv?pointType=S&temperatureOrHumidity=T"
          }
        ],
        table: {
          id: "soil_temperature_manage_table",
          table_url: "/gardens/temhumpoints/queryAllByPage?pointType=S&temperatureOrHumidity=T",
          label: [
            {
              name: "编号",
              prop: "pointsNo",
              width: "100",
              type: "em_input",
              placeholder: "编号",
              params: "pointsNo",
              add_show: true,
              alter_show: true
            },
            {
              name: "名称",
              prop: "pointsName",
              width: "100",
              type: "em_input",
              placeholder: "名称",
              params: "pointsName",
              add_show: true,
              alter_show: true
            },
            {
              name: "安装位置",
              prop: "position",
              width: "140",
              type: "em_input",
              placeholder: "安装位置",
              params: "position",
              add_show: true,
              alter_show: true
            },
            {
              name: "经度",
              prop: "longitude",
              width: "200",
              type: "em_input",
              placeholder: "经度",
              params: "longitude",
              add_show: true,
              alter_show: true
            },
            {
              name: "纬度",
              prop: "gpsLatitude",
              width: "160",
              type: "em_input",
              placeholder: "纬度",
              params: "gpsLatitude",
              add_show: true,
              alter_show: true
            },
            // {
            //   name:"责任单位",
            //   prop:"entId",
            //   width:"100",
            // },
            // {
            //   name:"责任人",
            //   prop:"gridId",
            //   width:"100"
            // },
            {
              name: "上限报警阀值",
              prop: "upperLimit",
              width: "180",
              type: "em_input",
              placeholder: "上限报警阀值",
              params: "upperLimit",
              add_show: true,
              alter_show: true
            },
            {
              name: "下限报警阀值",
              prop: "lowerLimit",
              width: "180",
              type: "em_input",
              placeholder: "下限报警阀值",
              params: "lowerLimit",
              add_show: true,
              alter_show: true
            },
            // {
            //   name:"所在网格",
            //   prop:"gridId",
            //   width:"100"
            // },
            {
              name: "备注",
              prop: "memo",
              width: "100",
              type: "em_input",
              placeholder: "备注",
              params: "memo",
              add_show: true,
              alter_show: true
            }
          ]
        }
      }
    },
    {
      id: "soil_humidity_manage",
      title: "土壤湿度监测点管理",
      top: "calc((100% - 500px)/2)",
      left:"calc((100% - 800px)/2)",
      width: 800,
      height: 500,
      show: false,
      class: "em-table-window",
      component: "sole_table",
      component_data: {
        operation: [
          {
            id: "soil_humidity_manage_select",
            type: "complex_em_input",
            select: [
              {
                name: "监测点名称",
                params: "pointsName"
              },
              {
                name: "编号",
                params: "pointsNo"
              }
            ]

          },
          {
            id: "soil_humidity_manage_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "soil_humidity_manage_table",
            fn: "search"
          },
          {
            id: "soil_humidity_manage_add",
            type: "em_button",
            icon: "el-icon-plus",
            operate: "添加",
            control_id: "soil_humidity_manage_table",
            fn: "add",
            url: "/gardens/temhumpoints/add"
          },
          {
            id: "soil_humidity_manage_modify",
            type: "em_button",
            icon: "el-icon-edit",
            operate: "修改",
            control_id: "soil_humidity_manage_table",
            fn: "modify",
            url: "/gardens/temhumpoints/update"
          },
          {
            id: "soil_humidity_manage_dele",
            type: "em_button",
            icon: "el-icon-delete",
            operate: "删除",
            control_id: "soil_humidity_manage_table",
            fn: "dele",
            url: "/gardens/temhumpoints/deletes"
          },
          {
            id: "soil_humidity_manage_import",
            type: "em_button",
            icon: "el-icon-excel_in",
            operate: "导入excel",
            fn: "import",
            control_id: "soil_humidity_manage_table",
            download_url: "/gardens/temhumpoints/downCsvmodel",
            import_url: "/gardens/temhumpoints/ajaxUpload"
          },
          {
            id: "soil_humidity_manage_export",
            type: "em_button",
            icon: "el-icon-excel_out",
            operate: "导出excel",
            fn: "export",
            control_id: "soil_humidity_manage_table",
            url: "/gardens/temhumpoints/exportCsv?pointType=S&temperatureOrHumidity=H"
          }
        ],
        table: {
          id: "soil_humidity_manage_table",
          table_url: "/gardens/temhumpoints/queryAllByPage?pointType=S&temperatureOrHumidity=H",
          label: [
            {
              name: "编号",
              prop: "pointsNo",
              width: "100",
              type: "em_input",
              placeholder: "编号",
              params: "pointsNo",
              add_show: true,
              alter_show: true
            },
            {
              name: "名称",
              prop: "pointsName",
              width: "100",
              type: "em_input",
              placeholder: "名称",
              params: "pointsName",
              add_show: true,
              alter_show: true
            },
            {
              name: "安装位置",
              prop: "position",
              width: "140",
              type: "em_input",
              placeholder: "安装位置",
              params: "position",
              add_show: true,
              alter_show: true
            },
            {
              name: "经度",
              prop: "longitude",
              width: "200",
              type: "em_input",
              placeholder: "经度",
              params: "longitude",
              add_show: true,
              alter_show: true
            },
            {
              name: "纬度",
              prop: "gpsLatitude",
              width: "160",
              type: "em_input",
              placeholder: "纬度",
              params: "gpsLatitude",
              add_show: true,
              alter_show: true
            },
            // {
            //   name:"责任单位",
            //   prop:"entId",
            //   width:"100",
            // },
            // {
            //   name:"责任人",
            //   prop:"gridId",
            //   width:"100"
            // },
            {
              name: "上限报警阀值",
              prop: "upperLimit",
              width: "100",
              type: "em_input",
              placeholder: "上限报警阀值",
              params: "upperLimit",
              add_show: true,
              alter_show: true
            },
            {
              name: "下限报警阀值",
              prop: "lowerLimit",
              width: "180",
              type: "em_input",
              placeholder: "下限报警阀值",
              params: "lowerLimit",
              add_show: true,
              alter_show: true
            },
            // {
            //   name:"所在网格",
            //   prop:"gridId",
            //   width:"100"
            // },
            {
              name: "备注",
              prop: "memo",
              width: "100",
              type: "em_input",
              placeholder: "备注",
              params: "memo",
              add_show: true,
              alter_show: true
            }
          ]
        }
      }
    },
    {
      id: "population_manage",
      title: "人流量监测点管理",
      top: "calc((100% - 500px)/2)",
      left:"calc((100% - 800px)/2)",
      width: 800,
      height: 500,
      show: false,
      class: "em-table-window",
      component: "sole_table",
      component_data: {
        operation: [
          {
            id: "population_manage_select",
            type: "complex_em_input",
            select: [
              {
                name: "监测点名称",
                params: "monitorName"
              },
              {
                name: "编号",
                params: "pointsNo"
              }
            ]

          },
          {
            id: "population_manage_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "population_manage_table",
            fn: "search"
          },
          {
            id: "population_manage_button_add",
            type: "em_button",
            icon: "el-icon-plus",
            operate: "添加",
            control_id: "population_manage_table",
            fn: "add",
            url: "/gardens/humantraffic/add"
          },
          {
            id: "population_manage_button_modify",
            type: "em_button",
            icon: "el-icon-edit",
            operate: "修改",
            control_id: "population_manage_table",
            fn: "modify",
            url: "/gardens/humantraffic/update"
          },
          {
            id: "population_manage_button_dele",
            type: "em_button",
            icon: "el-icon-delete",
            operate: "删除",
            control_id: "population_manage_table",
            fn: "dele",
            url: "/gardens/humantraffic/deletes"

          },
          {
            id: "population_manage_button_import",
            type: "em_button",
            icon: "el-icon-excel_in",
            operate: "导入excel",
            fn: "import",
            control_id: "population_manage_table",
            download_url: "/gardens/humantraffic/downCsvmodel",
            import_url: "/gardens/humantraffic/ajaxUpload"
          },
          {
            id: "population_manage_button_export",
            type: "em_button",
            icon: "el-icon-excel_out",
            operate: "导出excel",
            fn: "export",
            control_id: "population_manage_table",
            url: "/gardens/humantraffic/exportCsv"
          }
        ],
        table: {
          id: "population_manage_table",
          table_url: "/gardens/humantraffic/queryAllByPage",
          label: [
            {
              name: "编号",
              prop: "pointsNo",
              width: "100",
              type: "em_input",
              placeholder: "编号",
              params: "pointsNo",
              add_show: true,
              alter_show: true
            },
            {
              name: "名称",
              prop: "monitorName",
              width: "100",
              type: "em_input",
              placeholder: "名称",
              params: "monitorName",
              add_show: true,
              alter_show: true
            },
            {
              name: "安装位置",
              prop: "position",
              width: "140",
              type: "em_input",
              placeholder: "安装位置",
              params: "position",
              add_show: true,
              alter_show: true
            },
            {
              name: "经度",
              prop: "gpsLongitude",
              width: "200",
              type: "em_input",
              placeholder: "经度",
              params: "gpsLongitude",
              add_show: true,
              alter_show: true
            },
            {
              name: "纬度",
              prop: "gpsLatitude",
              width: "160",
              type: "em_input",
              placeholder: "纬度",
              params: "gpsLatitude",
              add_show: true,
              alter_show: true
            },
            // {
            //   name:"责任单位",
            //   prop:"entId",
            //   width:"100"
            // },
            // {
            //   name:"责任人",
            //   prop:"gridId",
            //   width:"100"
            // },
            {
              name: "橙色预警阀值",
              prop: "orangeWarning",
              width: "180",
              type: "em_input",
              placeholder: "橙色预警阀值",
              params: "orangeWarning",
              add_show: true,
              alter_show: true
            },
            {
              name: "红色预警阀值",
              prop: "redWarning",
              width: "180",
              type: "em_input",
              placeholder: "红色预警阀值",
              params: "redWarning",
              add_show: true,
              alter_show: true
            },
            // {
            //   name:"所在网格",
            //   prop:"gridId",
            //   width:"100"
            // },
            {
              name: "备注",
              prop: "memo",
              width: "100",
              type: "em_input",
              placeholder: "备注",
              params: "memo",
              add_show: true,
              alter_show: true
            }
          ]
        }
      }
    },
    {
      id: "air_temperature_manage",
      title: "空气温度监测点管理",
      top: "calc((100% - 500px)/2)",
      left:"calc((100% - 800px)/2)",
      width: 800,
      height: 500,
      show: false,
      class: "em-table-window",
      component: "sole_table",
      component_data: {
        operation: [
          {
            id: "air_temperature_manage_select",
            type: "complex_em_input",
            select: [
              {
                name: "监测点名称",
                params: "pointsName"
              },
              {
                name: "编号",
                params: "pointsNo"
              },
            ]

          },
          {
            id: "air_temperature_manage_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "air_temperature_manage_table",
            fn: "search"
          },
          {
            id: "air_temperature_manage_add",
            type: "em_button",
            icon: "el-icon-plus",
            operate: "添加",
            control_id: "air_temperature_manage_table",
            fn: "add",
            url: "/gardens/temhumpoints/add"
          },
          {
            id: "air_temperature_manage_modify",
            type: "em_button",
            icon: "el-icon-edit",
            operate: "修改",
            control_id: "air_temperature_manage_table",
            fn: "modify",
            url: "/gardens/temhumpoints/update"
          },
          {
            id: "air_temperature_manage_dele",
            type: "em_button",
            icon: "el-icon-delete",
            operate: "删除",
            control_id: "air_temperature_manage_table",
            fn: "dele",
            url: "/gardens/temhumpoints/deletes"
          },
          {
            id: "air_temperature_manage_import",
            type: "em_button",
            icon: "el-icon-excel_in",
            operate: "导入excel",
            fn: "import",
            control_id: "air_temperature_manage_table",
            download_url: "/gardens/temhumpoints/downCsvmodel",
            import_url: "/gardens/temhumpoints/ajaxUpload"
          },
          {
            id: "air_temperature_manage_export",
            type: "em_button",
            icon: "el-icon-excel_out",
            operate: "导出excel",
            fn: "export",
            control_id: "air_temperature_manage_table",
            url: "/gardens/temhumpoints/exportCsv?pointType=A&temperatureOrHumidity=T"
          }
        ],
        table: {
          id: "air_temperature_manage_table",
          table_url: "/gardens/temhumpoints/queryAllByPage?pointType=A&temperatureOrHumidity=T",
          label: [
            {
              name: "编号",
              prop: "pointsNo",
              width: "100",
              type: "em_input",
              placeholder: "编号",
              params: "pointsNo",
              add_show: true,
              alter_show: true
            },
            {
              name: "名称",
              prop: "pointsName",
              width: "100",
              type: "em_input",
              placeholder: "名称",
              params: "pointsName",
              add_show: true,
              alter_show: true
            },
            {
              name: "安装位置",
              prop: "position",
              width: "140",
              type: "em_input",
              placeholder: "安装位置",
              params: "position",
              add_show: true,
              alter_show: true
            },
            {
              name: "经度",
              prop: "gpsLongitude",
              width: "200",
              type: "em_input",
              placeholder: "经度",
              params: "gpsLongitude",
              add_show: true,
              alter_show: true
            },
            {
              name: "纬度",
              prop: "gpsLatitude",
              width: "160",
              type: "em_input",
              placeholder: "纬度",
              params: "gpsLatitude",
              add_show: true,
              alter_show: true
            },
            // {
            //   name:"责任单位",
            //   prop:"entId",
            //   width:"100",
            // },
            // {
            //   name:"责任人",
            //   prop:"gridId",
            //   width:"100"
            // },
            {
              name: "上限报警阀值",
              prop: "upperLimit",
              width: "100",
              type: "em_input",
              placeholder: "上限报警阀值",
              params: "upperLimit",
              add_show: true,
              alter_show: true
            },
            {
              name: "下限报警阀值",
              prop: "lowerLimit",
              width: "180",
              type: "em_input",
              placeholder: "下限报警阀值",
              params: "lowerLimit",
              add_show: true,
              alter_show: true
            },
            // {
            //   name:"所在网格",
            //   prop:"gridId",
            //   width:"100"
            // },
            {
              name: "备注",
              prop: "memo",
              width: "100",
              type: "em_input",
              placeholder: "备注",
              params: "memo",
              add_show: true,
              alter_show: true
            }
          ]
        }
      }
    },
    {
      id: "air_humidity_manage",
      title: "空气湿度监测点管理",
      top: "calc((100% - 500px)/2)",
      left:"calc((100% - 800px)/2)",
      width: 800,
      height: 500,
      show: false,
      class: "em-table-window",
      component: "sole_table",
      component_data: {
        operation: [
          {
            id: "air_humidity_manage_select",
            type: "complex_em_input",
            select: [
              {
                name: "监测点名称",
                params: "pointsName"
              },
              {
                name: "编号",
                params: "pointsNo"
              },
            ]
          },
          {
            id: "air_humidity_manage_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "air_humidity_manage_table",
            fn: "search"
          },
          {
            id: "air_humidity_manage_button_add",
            type: "em_button",
            icon: "el-icon-plus",
            operate: "添加",
            control_id: "air_humidity_manage_table",
            fn: "add",
            url: "/gardens/temhumpoints/add"
          },
          {
            id: "air_humidity_manage_button_modify",
            type: "em_button",
            icon: "el-icon-edit",
            operate: "修改",
            control_id: "air_humidity_manage_table",
            fn: "modify",
            url: "/gardens/temhumpoints/update"
          },
          {
            id: "air_humidity_manage_button_dele",
            type: "em_button",
            icon: "el-icon-delete",
            operate: "删除",
            control_id: "air_humidity_manage_table",
            fn: "dele",
            url: "/gardens/temhumpoints/deletes"
          },
          {
            id: "air_humidity_manage_button_import",
            type: "em_button",
            icon: "el-icon-excel_in",
            operate: "导入excel",
            fn: "import",
            control_id: "air_humidity_manage_table",
            download_url: "/gardens/temhumpoints/downCsvmodel",
            import_url: "/gardens/temhumpoints/ajaxUpload"
          },
          {
            id: "air_humidity_manage_button_export",
            type: "em_button",
            icon: "el-icon-excel_out",
            operate: "导出excel",
            fn: "export",
            control_id: "air_humidity_manage_table",
            url: "/gardens/temhumpoints/exportCsv?pointType=A&temperatureOrHumidity=H"
          }
        ],
        table: {
          id: "air_humidity_manage_table",
          table_url: "/gardens/temhumpoints/queryAllByPage?pointType=A&temperatureOrHumidity=H",
          label: [
            {
              name: "编号",
              prop: "pointsNo",
              width: "100",
              type: "em_input",
              placeholder: "编号",
              params: "pointsNo",
              add_show: true,
              alter_show: true
            },
            {
              name: "名称",
              prop: "pointsName",
              width: "100",
              type: "em_input",
              placeholder: "名称",
              params: "pointsName",
              add_show: true,
              alter_show: true
            },
            {
              name: "安装位置",
              prop: "position",
              width: "140",
              type: "em_input",
              placeholder: "安装位置",
              params: "position",
              add_show: true,
              alter_show: true
            },
            {
              name: "经度",
              prop: "gpsLongitude",
              width: "200",
              type: "em_input",
              placeholder: "经度",
              params: "gpsLongitude",
              add_show: true,
              alter_show: true
            },
            {
              name: "纬度",
              prop: "gpsLatitude",
              width: "160",
              type: "em_input",
              placeholder: "纬度",
              params: "gpsLatitude",
              add_show: true,
              alter_show: true
            },
            // {
            //   name:"责任单位",
            //   prop:"entId",
            //   width:"100",
            // },
            // {
            //   name:"责任人",
            //   prop:"gridId",
            //   width:"100"
            // },
            {
              name: "上限报警阀值",
              prop: "upperLimit",
              width: "100",
              type: "em_input",
              placeholder: "上限报警阀值",
              params: "upperLimit",
              add_show: true,
              alter_show: true
            },
            {
              name: "下限报警阀值",
              prop: "lowerLimit",
              width: "180",
              type: "em_input",
              placeholder: "下限报警阀值",
              params: "lowerLimit",
              add_show: true,
              alter_show: true
            },
            // {
            //   name:"所在网格",
            //   prop:"gridId",
            //   width:"100"
            // },
            {
              name: "备注",
              prop: "memo",
              width: "100",
              type: "em_input",
              placeholder: "备注",
              params: "memo",
              add_show: true,
              alter_show: true
            }
          ]
        }
      }
    },
    {
      id: "fire_alert_manage",
      title: "火灾报警点管理",
      top: "calc((100% - 500px)/2)",
      left:"calc((100% - 800px)/2)",
      width: 800,
      height: 500,
      show: false,
      class: "em-table-window",
      component: "sole_table",
      component_data: {
        operation: [
          {
            id: "fire_alert_manage_select",
            type: "complex_em_input",
            select: [
              {
                name: "监测点名称",
                params: "fireAlarmName"
              },
              {
                name: "编号",
                params: "pointsNo"
              }
            ]

          },
          {
            id: "fire_alert_manage_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "fire_alert_manage_table",
            fn: "search"
          },
          {
            id: "fire_alert_manage_button_add",
            type: "em_button",
            icon: "el-icon-plus",
            operate: "添加",
            control_id: "fire_alert_manage_table",
            fn: "add",
            url: "/gardens/firealarm/add"
          },
          {
            id: "fire_alert_manage_button_modify",
            type: "em_button",
            icon: "el-icon-edit",
            operate: "修改",
            control_id: "fire_alert_manage_table",
            fn: "modify",
            url: "/gardens/firealarm/update"
          },
          {
            id: "fire_alert_manage_button_dele",
            type: "em_button",
            icon: "el-icon-delete",
            operate: "删除",
            control_id: "fire_alert_manage_table",
            fn: "dele",
            url: "/gardens/firealarm/deletes"
          },
          {
            id: "fire_alert_manage_button_import",
            type: "em_button",
            icon: "el-icon-excel_in",
            operate: "导入excel",
            control_id: "fire_alert_manage_table",
            fn: "import",
            download_url: "/gardens/firealarm/downCsvmodel",
            import_url: "/gardens/firealarm/ajaxUpload"
          },
          {
            id: "fire_alert_manage_button_export",
            type: "em_button",
            icon: "el-icon-excel_out",
            control_id: "fire_alert_manage_table",
            operate: "导出excel",
            fn: "export",
            url: "/gardens/firealarm/exportCsv"
          }
        ],
        table: {
          id: "fire_alert_manage_table",
          table_url: "/gardens/firealarm/queryAllByPage",
          label: [
            {
              name: "编号",
              prop: "pointsNo",
              width: "100",
              type: "em_input",
              placeholder: "编号",
              params: "pointsNo",
              add_show: true,
              alter_show: true
            },
            {
              name: "名称",
              prop: "fireAlarmName",
              width: "100",
              type: "em_input",
              placeholder: "名称",
              params: "fireAlarmName",
              add_show: true,
              alter_show: true
            },
            {
              name: "安装位置",
              prop: "position",
              width: "140",
              type: "em_input",
              placeholder: "安装位置",
              params: "position",
              add_show: true,
              alter_show: true
            },
            {
              name: "经度",
              prop: "gpsLongitude",
              width: "200",
              type: "em_input",
              placeholder: "经度",
              params: "gpsLongitude",
              add_show: true,
              alter_show: true
            },
            {
              name: "纬度",
              prop: "gpsLatitude",
              width: "160",
              type: "em_input",
              placeholder: "纬度",
              params: "gpsLatitude",
              add_show: true,
              alter_show: true
            },
            {
              name: "状态",
              prop: "stat",
              width: "160",
              type: "em_input",
              placeholder: "状态",
              params: "stat",
              add_show: true,
              alter_show: true
            },
            // {
            //   name:"责任单位",
            //   prop:"entId",
            //   width:"100"
            // },
            // {
            //   name:"责任人",
            //   prop:"gridId",
            //   width:"100"
            // },
            // {
            //   name:"所在网格",
            //   prop:"gridId",
            //   width:"100"
            // },
            {
              name: "备注",
              prop: "memo",
              width: "100",
              type: "em_input",
              placeholder: "备注",
              params: "memo",
              add_show: true,
              alter_show: true
            }
          ]
        }
      }
    },
    {
      id: "permissions_management",
      title: "权限管理",
      top: "calc((100% - 500px)/2)",
      left:"calc((100% - 900px)/2)",
      width: 900,
      height: 620,
      show: false,
      class: "em-table-window",
      component: "treeForm",
      component_data: {}
    },
    {
      id: "scene_data",
      title: "场景数据",
      top: "128px",
      left: "calc(100% - 288px)",
      width: 280,
      height: 680,
      show: true,
      class: "",
      component: "emLayers",
      component_data: {
        emTabs_id:"scene_data_emTabs",
        emTabs: []
      }
    },
    {
      id: "test_data",
      title: "test",
      top: "106px",
      left: "calc((100% - 600px)/2)",
      width: 600,
      height: 132,
      show: true,
      class: "em-table-window",
      component: "buttonGroup",
      component_data: {
        buttonGroup: [
          {
            id: "bt_1",
            type: "info",
            icon: "el-icon-edit",
            text: "树木数据",
            trigger: true,
            control_type: "scene",
            control_id: "",
            fn: "scene_data",
            data_type: "1",
            layer_name: "tree1",
            data_maker_iconUrl: "../../static/image/marker_2.png",
            maker_titleKey: "id",
            clusters_color: "#181966"
          },
          {
            id: "bt_1_1",
            type: "info",
            icon: "el-icon-edit",
            text: "marker",
            trigger: true,
            control_type: "scene",
            control_id: "",
            fn: "scene_data",
            data_type: "4",
            layer_name: "fire",
            api_name: "marker",
            data_url: "/gardens/humantraffic/queryAll",
            data_maker_iconUrl: "../../static/image/marker_2.png",
            // params_pointsNo: 3,
            maker_titleKey: "id",
            clusters_color: "#ffc62e"
          },
          {
            id: "bt_1_2",
            type: "info",
            icon: "el-icon-edit",
            text: "树",
            trigger: true,
            control_type: "scene",
            control_id: "",
            fn: "scene_data",
            data_type: "4",
            layer_name: "tree",
            api_name: "marker",
            data_url: "/gardens/tree/queryVicinityPrint",
            data_maker_iconUrl: "../../static/image/marker_1.png",
            params_longitude: 114.03188276054428,
            params_latitude: 22.619840297782094,
            params_distance: 10000,
            maker_titleKey: "id",
            clusters_color: "#46ff71"
          },
          {
            id: "bt_4",
            type: "info",
            icon: "",
            text: "点",
            trigger: true,
            control_type: "scene",
            control_id: "",
            fn: "scene_data",
            data_type: "3",
            layer_name: "ly1",
            api_name: "geom",
            data_url: "/gardens/tree/queryVicinityPrint",
            geomType: "point",
            params_longitude: 114.03188276054428,
            params_latitude: 22.619840297782094,
            params_distance: 10000,
            geom_titleKey: "id",
            geom_style: "1",
            strokeWidth: 6,
            strokeColor: "[255, 0, 0, 255]",
            fillColor: "[0, 255, 255, 255]",
            clusters_enabled: "true",//聚合显示
            clusters_color: "#ff3d23"//聚合颜色
          },
          {
            id: "bt_4_1",
            type: "info",
            icon: "",
            text: "文本",
            trigger: true,
            control_type: "scene",
            control_id: "",
            fn: "scene_data",
            data_type: "3",
            layer_name: "ly11",
            api_name: "geom",
            data_url: "/gardens/humantraffic/queryAll",
            geomType: "text",
            // params_pointsNo: 3,
            geom_titleKey: "id",
            geom_style: "2",
            strokeWidth: 1,
            strokeColor: "[0, 255, 0, 255]",
            clusters_enabled: "false",//聚合显示
          },
          {
            id: "bt_5",
            type: "info",
            icon: "el-icon-edit",
            text: "线",
            trigger: true,
            control_type: "scene",
            control_id: "",
            fn: "scene_data",
            data_type: "3",
            layer_name: "ly2",
            api_name: "geom",
            data_url: "/gardens/tree/queryVicinityPrint",
            geomType: "line",
            params_longitude: 114.03188276054428,
            params_latitude: 22.619840297782094,
            params_distance: 10000,
            geom_titleKey: "id",
            strokeWidth: 1,
            strokeColor: "[0, 255, 0, 255]",
            fillColor: "[0, 100, 255, 255]"
          },
          {
            id: "bt_6",
            type: "info",
            icon: "el-icon-edit",
            text: "多边形",
            trigger: true,
            control_type: "scene",
            control_id: "",
            fn: "scene_data",
            data_type: "3",
            layer_name: "ly3",
            api_name: "geom",
            data_url: "/gardens/tree/queryVicinityPrint",
            geomType: "polygon",
            params_longitude: 114.03188276054428,
            params_latitude: 22.619840297782094,
            params_distance: 10000,
            geom_titleKey: "id",
            strokeWidth: 2,
            strokeColor: "[200, 255, 0, 255]",
            fillColor: "[255, 0, 0, 255]"
          },
          {
            id: "bt_7",
            type: "info",
            icon: "el-icon-edit",
            text: "圆",
            trigger: true,
            control_type: "scene",
            control_id: "",
            fn: "scene_data",
            data_type: "3",
            layer_name: "ly4",
            api_name: "geom",
            data_url: "/gardens/humantraffic/queryAll",
            geomType: "circle",
            geom_titleKey: "id",
            fillColor: "[230, 0, 255, 255]"
          },
          {
            id: "bt_8",
            type: "info",
            icon: "el-icon-edit",
            text: "模型",
            trigger: true,
            control_type: "scene",
            control_id: "",
            fn: "scene_data",
            data_type: "3",
            layer_name: "ly5",
            api_name: "geom",
            data_url: "/gardens/humantraffic/queryAll",
            geomType: "mode",
            geom_titleKey: "id",
            strokeWidth: 1,
            strokeColor: "[255, 255, 255, 255]",
            fillColor: "[255, 0, 0, 255]",
          },
          {
            id: "bt_2",
            type: "info",
            icon: "el-icon-edit",
            text: "街道树",
            control_type: "scene",
            control_id: "",
            fn: "scene_data",
            data_type: "2",
            layer_name: "tree1",
            data_url: "http://onelz.oicp.vip/proxy/server/A13041017DC845579548DA3528DF9B47/999C1448C6DD4842A35412B42226F0A3",
            data_maker_iconUrl: "../../static/image/marker_2.png",
            maker_titleKey: "OBJECTID",
            clusters_color: "#1d6633",
            trigger: true
          },
          {
            id: "bt_2_1",
            type: "info",
            icon: "el-icon-edit",
            text: "龙华区社区",
            control_type: "scene",
            control_id: "",
            fn: "scene_data",
            data_type: "2",
            layer_name: "shequ",
            data_url: "http://onelz.oicp.vip/proxy/server/F92A3799DFA243BC9DEB8B2BB6DDA4C9/999C1448C6DD4842A35412B42226F0A3",
            data_maker_iconUrl: "../../static/image/marker_2.png",
            maker_titleKey: "OBJECTID",
            clusters_color: "#f566ff",
            trigger: true
          },
          {
            id: "bt_2_2",
            type: "info",
            icon: "el-icon-edit",
            text: "龙华区街道",
            control_type: "scene",
            control_id: "",
            fn: "scene_data",
            data_type: "2",
            layer_name: "jiedao",
            data_url: "http://onelz.oicp.vip/proxy/server/8C20FC12319A4CB18BF0F90C4527DD54/999C1448C6DD4842A35412B42226F0A3",
            data_maker_iconUrl: "../../static/image/marker_2.png",
            maker_titleKey: "OBJECTID",
            clusters_color: "#f566ff",
            trigger: true
          },
          {
            id: "bt_3",
            type: "info",
            icon: "el-icon-edit",
            text: "垃圾箱",
            control_type: "scene",
            control_id: "",
            fn: "scene_data",
            data_type: "2",
            layer_name: "dustbin",
            data_url: "http://onelz.oicp.vip/proxy/server/4FACB86003FB479A851EFF7D09AE10F4/999C1448C6DD4842A35412B42226F0A3",
            data_maker_iconUrl: "../../static/image/marker_3.png",
            maker_titleKey: "OBJECTID",
            clusters_color: "#c42e1e",
            trigger: true
          },
        ]
      }
    },
    {
      id: "win_dialog",
      title: "火警详情信息",
      top: 60,
      left: 500,
      height: 400,
      show: false,
      resizable: true,
      class: "em-table-window",
      component: "sole_table",
      component_data: {
        operation: [
          {
            id: "fire_info_date",
            type: "em_date",

          },
          {
            id: "fire_info_button_search",
            type: "em_button",
            icon: "el-icon-search",
            operate: "查询",
            control_id: "fire_info_table",
            fn: "search"
          }
        ],
        table: {
          id: "fire_info_table",
          table_url: "/gardens/firealarminfo/queryAllByPage",
          after_digital_button_width: "80px",
          after_digital_button: [
            {
              name: "关闭报警",
              fn: "closeFireWarn",
              id: "closeFireWarn",
              dialog_name: "分配权限"
            }
          ],
          label: [
            {
              name: "检测设备号",
              prop: "fireAlarmId",
              width: "100",
              type: "em_input",
              placeholder: "检测设备号",
              params: "fireAlarmId",
              add_show: true,
              alter_show: true
            },
            {
              name: "报警等级",
              prop: "fireAlarmLevel",
              width: "100",
              type: "em_input",
              placeholder: "报警等级",
              params: "fireAlarmLevel",
              add_show: true,
              alter_show: true
            },
            {
              name: "报警信息",
              prop: "fireAlarmValue",
              width: "140",
              type: "em_input",
              placeholder: "报警信息",
              params: "fireAlarmValue",
              add_show: true,
              alter_show: true
            },
            {
              name: "发生时间",
              prop: "createDate",
              width: "140",
              type: "em_input",
              placeholder: "发生时间",
              params: "createDate",
              add_show: false,
              alter_show: false
            },
            {
              name: "备注",
              prop: "memo",
              width: "100",
              type: "em_input",
              placeholder: "备注",
              params: "memo",
              add_show: true,
              alter_show: true
            }
          ]
        }
      }
    }
  ],
  dialog: [
    {
      id: "people_manage_add_operation",
      title: "人员添加",
      show: false,
      type: "dome",
      data: [
        {
          type: "em_input",
          placeholder: "账户",
          name: "账户",
          params: ""
        },
        {
          type: "em_input",
          placeholder: "中文名",
          name: "中文名",
          params: ""

        },
        {
          type: "em_input",
          placeholder: "英文名",
          name: "英文名",
          params: ""

        },
        {
          type: "em_select",
          name: "状态",
          options: [{
            value: '选项1',
            label: '在职'
          },
            {
              value: '选项2',
              label: '离职'
            }
          ]

        },
        {
          type: "em_input",
          placeholder: "性别",
          name: "性别",
          params: ""

        },
        {
          type: "em_input",
          placeholder: "年龄",
          name: "年龄",
          params: ""

        },
        {
          type: "em_input",
          placeholder: "电话",
          name: "电话",
          params: ""

        },
        {
          id: "win_dialog",
          title: "火警详情信息",
          top: 60,
          left: 500,
          height: 400,
          show: false,
          resizable: true,
          class: "em-table-window",
          component: "sole_table",
          component_data: {
            operation: [
              {
                id: "fire_info_date",
                type: "em_date",

              },
              {
                id: "fire_info_button_search",
                type: "em_button",
                icon: "el-icon-search",
                operate: "查询",
                control_id: "fire_info_table",
                fn: "search"
              }
            ],
            table: {
              id: "fire_info_table",
              table_url: "/gardens/firealarminfo/queryAllByPage?isClose=0",
              label: [
                {
                  name: "检测设备号",
                  prop: "fireAlarmId",
                  width: "100",
                  type: "em_input",
                  placeholder: "检测设备号",
                  params: "fireAlarmId",
                  add_show: true,
                  alter_show: true
                },
                {
                  name: "报警等级",
                  prop: "fireAlarmLevel",
                  width: "100",
                  type: "em_input",
                  placeholder: "报警等级",
                  params: "fireAlarmLevel",
                  add_show: true,
                  alter_show: true
                },
                {
                  name: "报警信息",
                  prop: "fireAlarmValue",
                  width: "140",
                  type: "em_input",
                  placeholder: "报警信息",
                  params: "fireAlarmValue",
                  add_show: true,
                  alter_show: true
                },
                {
                  name: "发生时间",
                  prop: "createDate",
                  width: "140",
                  type: "em_input",
                  placeholder: "发生时间",
                  params: "createDate",
                  add_show: false,
                  alter_show: false
                },
                {
                  name: "备注",
                  prop: "memo",
                  width: "100",
                  type: "em_input",
                  placeholder: "备注",
                  params: "memo",
                  add_show: true,
                  alter_show: true
                }
              ]
            }
          }
        }
      ],
      dialog: [
        {
          type: "em_input",
          placeholder: "账户",
          name: "账户",
          params: ""

        },
        {
          type: "em_input",
          placeholder: "中文名",
          name: "中文名",
          params: ""

        },
        {
          type: "em_input",
          placeholder: "英文名",
          name: "英文名",
          params: ""
        },
      ]

    },
  ]
};

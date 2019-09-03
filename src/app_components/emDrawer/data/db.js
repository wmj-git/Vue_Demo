let option = {
  oilDetective: [//土壤监测
    {
      label: "字段1",
      value: "123",
      valueKey: "",
      type: "info"
    }
  ],
  populationDetective: [//人流量监测
    {
      label: "字段1",
      value: "123",
      valueKey: "",
      type: "info"
    }
  ],
  airDetective: [//空气监测
    {
      label: "字段1",
      value: "123",
      valueKey: "",
      type: "info"
    }
  ],
  fireAlert: [//火灾报警
    {
      label: "字段1",
      value: "123",
      valueKey: "",
      type: "info"
    }
  ],
  roadAddress: [//道路地址
    {
      label: "字段1",
      value: "123",
      valueKey: "",
      type: "info"
    }
  ],
  district: [//行政区划
    {
      label: "字段1",
      value: "123",
      valueKey: "",
      type: "info"
    }
  ],
  protectCompany: [//养护单位
    {
      label: "字段1",
      value: "123",
      valueKey: "",
      type: "info"
    }
  ],
  TreeDistribution: [//特殊树木分布
    {
      label: "字段1",
      value: "123",
      valueKey: "",
      type: "info"
    }
  ]

};

export function showFn(_obj) {
  let _data = [];
  if(_obj.type){
    _data=option[_obj.type];
  }else{

  }


  return _data;
}

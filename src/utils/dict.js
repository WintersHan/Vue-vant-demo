const data = {
  commonStatus: {
    name: '一般情况',
    waistline: '腰围',
    weight: '体重',
    height: '身高',
    mainsymptoms: '症状',
    elsesymptoms: '症状',
    respiratory: '呼吸频率',
    pulse: '脉率',
    heat: '体温',
    leftShuzhangya: '左舒张压',
    leftShousuoya: '左收缩压',
    rightShuzhangya: '右舒张压',
    rightShousuoya: '右收缩压',
    bmi: '身体质量指数（BMI)'
  },
  waistline: '腰围',
  weight: '体重',
  height: '身高',
  mainsymptoms: '症状',
  elsesymptoms: '其他症状',
  respiratory: '呼吸频率',
  pulse: '脉率',
  heat: '体温',
  leftShuzhangya: '左舒张压',
  leftShousuoya: '左收缩压',
  rightShuzhangya: '右舒张压',
  rightShousuoya: '右收缩压',
  bmi: '身体质量指数（BMI)',
  liveStyle: {
    name: '生活方式',
    train: {
      trainingRate: '锻炼频率',
      trainingTime: '每次锻炼时间',
      trainingTotalTime: '坚持锻炼时间',
      trainingWay: '锻炼方式'
    },
    smokeStatus: {
      smoke: '吸烟状况',
      smokeNum: '日吸烟量',
      smokeAgeS: '开始抽烟时间',
      smokeAgeE: '结束抽烟时间'
    },
    alcoholStatus: {
      drink: '饮酒频率',
      drinkNum: '日饮酒量',
      noDrink: '是否戒酒',
      drinkAge: '开始饮酒年龄',
      drunk: '近一年是否醉酒',
      drinkType: '饮酒种类'
    },
    occupationExposeStatus: {
      exposeStat: '',
      exposeYear: '',
      duWuType: {
        dust: '粉尘',
        dustStep: '',
        emit: '放射物',
        emitStep: '',
        phy: '物理因素',
        phyStep: '',
        chemie: '化学物质',
        chemieStep: '',
        other: '其他',
        otherStep: ''

      }
    }
  },
  lips: '口唇',
  gorge: '咽部',
  dentition: '齿列',
  oral: '口腔',
  quChi: '龋齿',
  quChiLeftUp: '左上',
  quChiRightUp: '右上',
  quChiLeftDown: '左下',
  quChiRightDown: '右下',
  queChi: '缺齿',
  queChiLeftUp: '左上',
  queChiRightUp: '右上',
  queChiLeftDown: '左下',
  queChiRightDown: '右下',
  yiChi: '义齿',
  yiChiLeftUp: '左上',
  yiChiRightUp: '右上',
  yiChiLeftDown: '左下',
  yiChiRightDown: '右下',
  eye: '视力',
  leftNaked: '左眼',
  rightNaked: '右眼',
  leftCorrect: '左娇正',
  rightCorrect: '右矫正',
  hear: '听力',
  hearing: '听力',
  sport: '运动',
  sportFunction: '运动功能',
  zangQiFunction: {
    name: '脏器功能',
    oral: {
      name: '口腔',
      lips: '口唇',
      gorge: '咽部',
      dentition: '齿列',
      quChi: {
        name: '龋齿',
        quChiLeftUp: '左上',
        quChiRightUp: '右上',
        quChiLeftDown: '左下',
        quChiRightDown: '右下'
      },
      queChi: {
        name: '缺齿',
        queChiLeftUp: '左上',
        queChiRightUp: '右上',
        queChiLeftDown: '左下',
        queChiRightDown: '右下'
      },
      yiChi: {
        name: '义齿',
        yiChiLeftUp: '左上',
        yiChiRightUp: '右上',
        yiChiLeftDown: '左下',
        yiChiRightDown: '右下'
      }

    },
    eye: {
      name: '视力',
      leftNaked: '左眼',
      rightNaked: '右眼',
      leftCorrect: '左娇正',
      rightCorrect: '右矫正'
    },
    hear: {
      name: '听力',
      hearing: '听力'
    },
    sport: {
      name: '运动功能',
      sportFunction: '运动功能'
    }
  },
  abdomen: '腹部',
  abdominalMass: '包块',
  massDescription: '',
  hepatomegaly: '肝大',
  splenomegaly: '脾大',
  splenomegalyDescription: '',
  lungDullness: '移动性浊音',
  lungDullnessDescription: '',
  abdominalTenderness: '压痛',
  tendernessDescription: '',
  lung: '肺',
  lungRale: '罗音',
  lungRaleDescription: '',
  lungBreath: '呼吸音',
  lungBreathDescription: '',
  chestBarrel: '桶状胸',
  heart: '心脏',
  heartRate: '心率',
  heartRateType: '心律',
  heartMurmur: '杂音',
  legs: '下肢水肿',
  commonCheck: {
    name: '一般检查',
    fundus: '眼底',
    eyeExamination: '',
    skin: '皮肤',
    res0: '',
    sclera: '巩膜',
    scleraElse: '',
    lymphaden: '淋巴结',
    lymphadenElse: '',
    Legs: '下肢水肿',
    acrotarsium: '足背动脉搏动',
    anus: '肛门指诊',
    anusElse: '',
    breast: '乳腺',
    breastElse: '',
    lung: {
      name: '肺',

      lungRale: '罗音',
      lungRaleDescription: '',

      lungBreath: '呼吸音',
      lungBreathDescription: '',

      chestBarrel: '桶状胸'
    },
    heart: {
      name: '心脏',

      heartRate: '心率',

      heartRateType: '心律',

      heartMurmur: '杂音'
    },
    abdomen: {
      name: '腹部',
      abdominalMass: '包块',
      massDescription: '',
      hepatomegaly: '肝大',
      splenomegaly: '脾大',
      splenomegalyDescription: '',
      lungDullness: '移动性浊音',
      lungDullnessDescription: '',
      abdominalTenderness: '压痛',
      tendernessDescription: ''
    },
    gynaecology: {
      name: '妇科',
      vulva: '外阴',
      vulvaDescription: '',
      vagina: '阴道',
      vaginaDescription: '',
      cervical: '宫颈',
      cervixDescription: '',
      uterus: '宫体',
      attachment: '附件',
      attachmentDescription: '',
      medicalElse: '其他'
    }
  },
  fundus: '眼底',
  eyeExamination: '',
  skin: '皮肤',
  res0: '',
  sclera: '巩膜',
  scleraElse: '',
  lymphaden: '淋巴结',
  lymphadenElse: '',
  Legs: '下肢水肿',
  acrotarsium: '足背动脉搏动',
  anus: '肛门指诊',
  anusElse: '',
  breast: '乳腺',
  breastElse: '',
  XRay: '胸部X线片',
  XRayElse: '',
  BComprehensive: 'B 超',
  BDescription: '',
  fbg: '空腹血糖',
  fbgDl: '',
  hcy: '同型半胱氨酸',
  malb: '尿微量蛋白',
  stoolBlood: '大便潜血',
  hbalc: '糖化血红蛋白',
  hbsag: '乙型肝炎表面抗原',
  bloodFat: '血脂',
  cholesterol: '总胆固醇',

  triglycerides: '甘油三脂',

  ldl: '血清低密度脂蛋白胆固醇',

  hdl: '血清高密度脂蛋白胆固醇',
  bloodRoutine: '血常规',
  hemoglobin: '血红蛋白',
  leukocyte: '白细胞',
  platelet: '血小板',
  bloodElse: '其他',
  urineRoutine: '尿常规',

  pro: '尿蛋白',

  glu: '尿糖',

  ket: '尿酮体',

  ery: '尿潜血',

  urineElse: '其他',
  liverFunction: '肝功能',
  serumAlt: '血清谷丙转氨酶',

  ast: '血清谷草转氨酶',

  albumin: '白蛋白',

  tbil: '总胆红素',

  bilirubin: '结合胆红素',
  renalFunction: '肾功能',
  scr: '血清肌酐',
  bun: '血尿素氮',
  potassium: '血钾浓度',
  sodium: '血钠浓度',
  otherCheck: {
    name: '生化检验',
    abo: '',
    rh: '',
    XRay: '胸部X线片',
    XRayElse: '',
    BComprehensive: 'B 超',
    BDescription: '',
    bloodRoutine: {
      hemoglobin: '血红蛋白',
      leukocyte: '白细胞',
      platelet: '血小板',
      bloodElse: '其他'
    },
    urineRoutine: {
      name: '尿常规',

      pro: '尿蛋白',

      glu: '尿糖',

      ket: '尿酮体',

      ery: '尿潜血',

      urineElse: '其他'
    },

    fbg: '空腹血糖',
    fbgDl: '',
    hcy: '同型半胱氨酸',
    malb: '尿微量蛋白',
    stoolBlood: '大便潜血',
    hbalc: '糖化血红蛋白',
    hbsag: '乙型肝炎表面抗原',
    liverFunction: {
      name: '肝功能',

      serumAlt: '血清谷丙转氨酶',

      ast: '血清谷草转氨酶',

      albumin: '白蛋白',

      tbil: '总胆红素',

      bilirubin: '结合胆红素'
    },
    renalFunction: {
      name: '肾功能',

      scr: '血清肌酐',

      bun: '血尿素氮',

      potassium: '血钾浓度',

      sodium: '血钠浓度'
    },
    bloodFat: {
      name: '血脂',

      cholesterol: '总胆固醇',

      triglycerides: '甘油三脂',

      ldl: '血清低密度脂蛋白胆固醇',

      hdl: '血清高密度脂蛋白胆固醇'
    },
    ecg: '心电图',
    ecgDescription: '',
    cervix: '宫颈涂片',
    cervixDescription: '',
    auxiliaryElse: '其他'

  },
  nowHealthProblem: {
    name: '现存健康问题',
    cerebrovascular: '脑血管疾病',
    cerebrovascularElse: '',
    kidney: '肾脏疾病',
    renalElse: '',
    heartDisease: '心血管疾病',
    heartDiseaseElse: '',
    eyeDisease: '眼部疾病',
    eyeDiseaseElse: '',
    neuropathy: '神经系统其他疾病',
    neuropathyElse: '',
    diseaseElse: '其他系统疾病',
    isDiseaseElse: ''
  },
  cerebrovascular: '脑血管疾病',
  cerebrovascularElse: '',
  kidney: '肾脏疾病',
  renalElse: '',
  heartDisease: '心血管疾病',
  heartDiseaseElse: '',
  eyeDisease: '眼部疾病',
  eyeDiseaseElse: '',
  neuropathy: '神经系统其他疾病',
  neuropathyElse: '',
  diseaseElse: '其他系统疾病',
  isDiseaseElse: '',
  hospitalized: {
    name: '住院治疗情况',
    hospitalHistory: {
      name: '住院史',
      inDateGB: '入院日期',

      outDateGB: '出院日期',

      reasonGB: '原因',

      hosNameGB: '医疗机构名称',

      medicalRecordGB: '病案号'
    },
    homeBedHistory: {
      name: '家族病床史',
      sickbedDateGB: '建床日期',
      removeDateGB: '撤床日期',
      sickbedCause: '原因',
      hospital: '医疗机构名称',
      medicalRecord: '病案号'
    },
    assessGuide: {
      name: '评价指导',
      healthException: '异常1',

      res3: '异常2',

      res4: '异常3',

      res5: '异常4',

      healthGuide: '健康指导',

      res2: '危险因素控制',
      dangerControl: '',

      targetWeight: '减体重目标',

      vaccination: '建议接种疫苗'
    },
    drugUsage: {
      name: '用药',

      drugNameGB: '药物名称',

      usage: '用法',

      dosage: '用量',

      medicationTime: '用药时间',

      medicationComplianceGB: '服药依从性'
    }
  },
  assessGuide: {
    name: '评价指导'
  },
  personalInfo: {
    name: '个人信息'
  }

};
export const urineRoutine = {
  'DM100-38_1': '-',
  'DM100-38_2': '+-',
  'DM100-38_3': '1+',
  'DM100-38_4': '2+',
  'DM100-38_5': '3+',
  'DM100-38_6': '4+'
};
export const getHumanName = (key) => {
  if (!data.hasOwnProperty(key)) {
    return null;
  }
  if (data[key].hasOwnProperty('name')) {
    return data[key]['name'];
  }
  return data[key];
};

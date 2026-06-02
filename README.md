# 🇰🇿 QazCode - Қазақша Бағдарламалау Тілі

> 世界首个**哈萨克语编程语言** | Әлемдегі бірінші қазақша бағдарламалау тілі

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/Web-Live-green)](https://ye4712.github.io/qazcode-)

## 📖 Құрылымы (项目结构)

```
qazcode/
├── index.html              # 🏠 主页
├── playground.html         # 🎮 代码编辑器
├── tutorials/
│   ├── basics.html         # 📚 基础语法
│   ├── interpreter.html    # 🔧 解释器原理
│   └── examples.html       # 💡 代码示例
├── docs/
│   ├── language-spec.md    # 📋 语言规范
│   └── architecture.md     # 🏗️ 架构设计
├── js/
│   ├── interpreter.js      # ⚙️ 核心解释器
│   └── utils.js            # 🛠️ 工具函数
├── css/
│   ├── style.css           # 🎨 全局样式
│   └── theme.css           # 🌈 主题颜色
└── README.md               # 📄 本文件
```

## 🚀 快速开始

### 在线使用
访问：https://ye4712.github.io/qazcode-/playground.html

### 本地运行
```bash
git clone https://github.com/ye4712/qazcode-.git
cd qazcode-
# 用任何 HTTP 服务器打开 index.html
python -m http.server 8000
# 然后访问 http://localhost:8000
```

## 📚 语法示例

### 1. 打印输出
```qaz
басып_шығару("Сәлем, Қазақстан!");
```

### 2. 变量定义
```qaz
х = 10;
у = 20;
атың = "Қайрат";
```

### 3. 算术运算
```qaz
қосынды = х + у;
айырма = х - у;
көбейтін = х * у;
бөлінді = х / у;
```

### 4. 条件语句
```qaz
егер х > 5:
  басып_шығару("х үлкен");
```

## 🔧 功能特点

- ✅ **简洁的哈萨克语语法** - 容易学习
- ✅ **实时代码执行** - 立即看到结果
- ✅ **详细教程** - 从零开始学编程
- ✅ **底层原理讲解** - 了解编译器工作原理
- ✅ **代码示例库** - 10+ 实用程序
- ✅ **交互式编辑器** - 友好的开发环境

## 📖 教程与文档

- [基础语法](tutorials/basics.html) - 学习 QazCode 基础
- [解释器原理](tutorials/interpreter.html) - 了解如何执行代码
- [代码示例](tutorials/examples.html) - 实用的代码片段
- [语言规范](docs/language-spec.md) - 完整的语言参考
- [架构设计](docs/architecture.md) - 底层实现细节

## 🎯 发展路线图

- [x] 基础解释器
- [x] 主页和编辑器
- [ ] 更多数据类型（列表、字典）
- [ ] 循环语句（for, while）
- [ ] 函数定义
- [ ] 错误处理和调试工具
- [ ] 包管理系统
- [ ] 标准库

## 💡 对初学者的意义

QazCode 展示了：
1. **如何创建编程语言** - 从语法到执行
2. **编译器设计基础** - 词法分析、语法分析、代码生成
3. **虚拟机原理** - 字节码解释执行
4. **文化与技术的结合** - 用母语学编程

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

**Made with ❤️ for Kazakhstan** 🇰🇿

让我们一起用哈萨克语编程！ Құрайық қазақша бағдарламалау!
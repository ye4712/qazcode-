# QazCode - Архитектуралық Дизайн және Құрылымдық Анықтамасы

## 📋 Құрылымдық Диаграмма

```
┌─────────────────────────────────────────────────────────┐
│           Қазақша Бағдарламалау Тілі                    │
│                    (QazCode)                             │
└─────────────────────────────────────────────────────────┘
           │
           ├── Лексикалық Анализ (Tokenization)
           │   └── Кодты токенге ажырату
           │
           ├── Синтаксистік Анализ (Parsing)
           │   └── Токендерді ағашты құру
           │
           ├── Семантикалық Анализ (Semantic Analysis)
           │   └── Түстіктіліктерді тексеру
           │
           └── Орындау (Execution)
               └── Интерпретор арқылы орындау
```

---

## 🔍 Компоненттер Бөлімі

### 1. **Лексикалық Анализатор (Lexer)**

**Файл**: `js/interpreter.js`

**Міндеті**: Бағдарлама мәтінін токенге ажырату

**Мысал**:
```
Кириту:  басып_шығару("Сәлем");
Шығыс:   [KEYWORD(басып_шығару), LPAREN, STRING("Сәлем"), RPAREN, SEMICOLON]
```

### 2. **Синтаксистік Анализатор (Parser)**

**Міндеті**: Токендерді синтаксистік ағашқа айндатыңдаған

**Мысал**:
```
Token: [IF, IDENTIFIER(x), GT, NUMBER(5), COLON]
AST:   IfStatement(condition: BinaryOp(x > 5), body: [...])
```

### 3. **Интерпретор (Interpreter)**

**Файл**: `js/interpreter.js`

**Сынып**: `QazCodeInterpreter`

**Түйіндік әдістері**:
- `run(code)` - Бағдарламаны орындау
- `evaluateExpression(expr)` - Өрнекті есептеу
- `addOutput(text, type)` - Нәтижені өндіктеме

---

## 🏗️ Өндіктеме Ағышы

### Қадам 1: Кодты қабылдау

```javascript
const code = `
х = 10;
басып_шығару(х);
`;
```

### Қадам 2: Интерпретор объектісін құру

```javascript
const interpreter = new QazCodeInterpreter();
```

### Қадам 3: Кодды орындау

```javascript
const result = interpreter.run(code);
```

### Қадам 4: Нәтижені көрсету

```javascript
// result = ["<span>> 10</span>"]
outputDiv.innerHTML = result.join('<br>');
```

---

## 📊 Өндіктемелік Байланыстар

### Айнымалы Құрылымы

```javascript
this.variables = {
    'х': 10,
    'у': 20,
    'аты': 'Қайрат'
};
```

### Нәтиже Құрылымы

```javascript
this.output = [
    '<span>> 10</span>',
    '<span class="error">❌ Қате: ...</span>',
    '<span class="success">✓ Орындалды</span>'
];
```

---

## 🔗 Байланыстардың Ағышы

```
User Input
    ↓
[playground.html]
    ↓ (runCode function)
[js/interpreter.js]
    ↓ (new QazCodeInterpreter())
[QazCodeInterpreter.run(code)]
    ├→ Parse lines
    ├→ Check command type
    ├→ Execute command
    └→ Add to output
    ↓
[output array]
    ↓ (innerHTML)
[Display on screen]
```

---

## 💾 Өндіктемелік Төлеу

### Қос тырнақ мәтіндік өндіктеу

```javascript
if ((expr.startsWith('"') && expr.endsWith('"')) || 
    (expr.startsWith("'") && expr.endsWith("'"))) {
    return expr.slice(1, -1);
}
```

### Айнымалы ауыстыру

```javascript
let processedExpr = expr;
for (let varName in this.variables) {
    const regex = new RegExp(`\\b${varName}\\b`, 'g');
    processedExpr = processedExpr.replace(regex, this.variables[varName]);
}
```

### Өрнек есептеу

```javascript
evaluateExpression(expr) {
    const result = Function('"use strict"; return (' + expr + ')')();
    return result;
}
```

---

## 🎯 Қуысындық Операторлары

### басып_шығару() - Print

```javascript
if (line.startsWith('басып_шығару(')) {
    const match = line.match(/басып_шығару\((.*)\)$/);
    const expr = match[1];
    const result = this.evaluateExpression(expr);
    this.addOutput(String(result));
}
```

**Ағышы**:
1. Регулярлық өрнекті ағын
2. Тырнақты орындау
3. Өндіктеме қосу

### Айнымалы анықтамасы

```javascript
else if (line.includes('=')) {
    const [varName, varValue] = line.split('=').map(s => s.trim());
    this.variables[varName] = this.evaluateExpression(varValue);
}
```

### Шартты оператор

```javascript
else if (line.startsWith('егер ')) {
    const [condition, body] = line.split(':');
    if (this.evaluateExpression(condition)) {
        // Қырау орындау
    }
}
```

---

## 🐛 Қате Өндіктеме

### Қатенің Түрлері

| Түрі | Мысал | Сәлі |
|------|-------|------|
| Синтаксис | `басып_шығару("Сәлем` | Жапу тырнақ жоқ |
| Айнымалы | `басып_шығару(x)` x анықтамалы емес | Айнымалы табылмады |
| Типік | `"5" + 3` типік теңсіз | Теңсіз типіктер |

### Қате Өндіктеме

```javascript
catch (e) {
    this.addOutput(e.message, 'error');
}
```

---

## 🚀 Болашақ Өндіктемелік

### Циклды өндіктеме

```javascript
// барлық i 1-ден 10-ке дейін:
//     басып_шығару(i);

handleLoop(lines, startIndex) {
    const match = line.match(/барлық\s+(\w+)\s+([0-9]+)-ден\s+([0-9]+)-ке/);
    for (let i = start; i <= end; i++) {
        // орындау
    }
}
```

### Функция анықтамасы

```javascript
// функция есте_сәлеме():
//     басып_шығару("Сәлем");
// есте_сәлеме();

handleFunctionDef(name, body) {
    this.functions[name] = body;
}
```

### Массив өндіктемесі

```javascript
// сана = [1, 2, 3, 4, 5];
// басып_шығару(сана[0]);

this.arrays = {
    'сана': [1, 2, 3, 4, 5]
};
```

---

## 📈 Қатынас Құрылымдары

### Әселі классы

```
┌─────────────────────────────┐
│  QazCodeInterpreter         │
├─────────────────────────────┤
│ - variables: {}             │
│ - output: []                │
│ - functions: {}             │
├─────────────────────────────┤
│ + run(code): array          │
│ + evaluateExpression(expr)  │
│ + addOutput(text, type)     │
│ + handlePrint(line)         │
│ + handleAssignment(line)    │
│ + handleCondition(...)      │
└─────────────────────────────┘
```

---

## 🔐 Қауіптіліктер

### JavaScript Орындалуы

```javascript
// Қаупіліктік әдіс: Function конструкторы
const result = Function('"use strict"; return (' + expr + ')')();

// Себебі: eval() өте қаупіліктік
// eval(expr);  // ❌ Қатер!
```

### Синтаксис Тексеру

```javascript
// Айнымалы аты регулярлықты тексеру
if (!/^[a-zA-Zа-яА-Я_][a-zA-Zа-яА-Я0-9_]*$/.test(varName)) {
    throw new Error(`Айнымалы атауы дұрыс емес: ${varName}`);
}
```

---

## 📚 Сілтемелер

- [JavaScript Function Constructor](https://developer.mozilla.org/en-US/docs/Global_Objects/Function)
- [Interpreter Pattern](https://refactoring.guru/design-patterns/interpreter)
- [Compiler Design Basics](https://en.wikipedia.org/wiki/Compiler)

---

**Автор**: ye4712  
**Лицензиялар**: MIT  
**Соңғы өзгеріс**: 2026-06-02

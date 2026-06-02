/**
 * QazCode 解释器核心模块
 * 负责解析和执行哈萨克语代码
 */

class QazCodeInterpreter {
    constructor() {
        this.variables = {};
        this.output = [];
    }

    addOutput(text, type = 'normal') {
        if (type === 'error') {
            this.output.push(`<span class="error">❌ Қате: ${text}</span>`);
        } else if (type === 'success') {
            this.output.push(`<span class="success">✓ ${text}</span>`);
        } else {
            this.output.push(`<span>> ${text}</span>`);
        }
    }

    evaluateExpression(expr) {
        expr = expr.trim();
        let processedExpr = expr;
        
        for (let varName in this.variables) {
            const regex = new RegExp(`\\b${varName}\\b`, 'g');
            let value = this.variables[varName];
            if (typeof value === 'string') {
                value = `"${value}"`;
            }
            processedExpr = processedExpr.replace(regex, value);
        }

        processedExpr = processedExpr.replace(/"([^"]*)"/g, "'$1'");

        try {
            const result = Function('"use strict"; return (' + processedExpr + ')')();
            return result;
        } catch (e) {
            throw new Error(`Өрнектеуді синтаксис қатесі: ${expr}`);
        }
    }

    run(code) {
        this.variables = {};
        this.output = [];

        const lines = code.split('\n');

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].trim();

            if (!line || line.startsWith('#')) continue;

            try {
                if (line.startsWith('басып_шығару(')) {
                    const match = line.match(/басып_шығару\((.*)\)$/);
                    if (!match) {
                        throw new Error(`Синтаксис қатесі: ${line}`);
                    }
                    const expr = match[1];

                    if ((expr.startsWith('"') && expr.endsWith('"')) || 
                        (expr.startsWith("'") && expr.endsWith("'"))) {
                        this.addOutput(expr.slice(1, -1));
                    } else {
                        const result = this.evaluateExpression(expr);
                        this.addOutput(String(result));
                    }
                }
                else if (line.includes('=') && !line.startsWith('егер')) {
                    const parts = line.split('=');
                    if (parts.length !== 2) {
                        throw new Error(`Синтаксис қатесі: ${line}`);
                    }
                    const varName = parts[0].trim();
                    const varValue = parts[1].trim();

                    if (!/^[a-zA-Zа-яА-Я_][a-zA-Zа-яА-Я0-9_]*$/.test(varName)) {
                        throw new Error(`Айнымалы атауы дұрыс емес: ${varName}`);
                    }

                    if ((varValue.startsWith('"') && varValue.endsWith('"')) ||
                        (varValue.startsWith("'") && varValue.endsWith("'"))) {
                        this.variables[varName] = varValue.slice(1, -1);
                    } else {
                        this.variables[varName] = this.evaluateExpression(varValue);
                    }
                }
                else if (line.startsWith('егер ')) {
                    const parts = line.split(':');
                    if (parts.length !== 2) {
                        throw new Error(`Синтаксис қатесі: ${line}`);
                    }
                    const condition = parts[0].replace('егер ', '').trim();

                    try {
                        const result = this.evaluateExpression(condition);
                        if (result) {
                            const nextLine = parts[1].trim();
                            if (nextLine.startsWith('басып_шығару(')) {
                                const match = nextLine.match(/басып_шығару\((.*)\)$/);
                                if (match) {
                                    const expr = match[1];
                                    if ((expr.startsWith('"') && expr.endsWith('"'))) {
                                        this.addOutput(expr.slice(1, -1));
                                    } else {
                                        this.addOutput(String(this.evaluateExpression(expr)));
                                    }
                                }
                            }
                        }
                    } catch (e) {
                        throw new Error(`Шарт қатесі: ${condition}`);
                    }
                }
                else {
                    this.addOutput(`Белгісіз команда: ${line}`, 'error');
                }
            } catch (e) {
                this.addOutput(e.message, 'error');
            }
        }

        return this.output;
    }
}

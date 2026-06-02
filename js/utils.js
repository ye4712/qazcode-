/**
 * QazCode 工具函数库
 */

const QazCodeUtils = {
    /**
     * 验证哈萨克语标识符
     */
    isValidIdentifier(name) {
        return /^[a-zA-Zа-яА-Я_][a-zA-Zа-яА-Я0-9_]*$/.test(name);
    },

    /**
     * 格式化输出
     */
    formatOutput(text, type = 'normal') {
        const timestamp = new Date().toLocaleTimeString();
        const iconMap = {
            'error': '❌',
            'success': '✓',
            'warning': '⚠️',
            'info': 'ℹ️',
            'normal': '>'
        };
        
        return `[${timestamp}] ${iconMap[type] || iconMap['normal']} ${text}`;
    },

    /**
     * 解析参数字符串
     */
    parseArgs(argString) {
        const args = [];
        let current = '';
        let inString = false;

        for (let i = 0; i < argString.length; i++) {
            const char = argString[i];
            if ((char === '"' || char === "'") && argString[i - 1] !== '\\\\') {
                inString = !inString;
            } else if (char === ',' && !inString) {
                if (current.trim()) args.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }

        if (current.trim()) args.push(current.trim());
        return args;
    },

    /**
     * 简单的语法高亮
     */
    highlightCode(code) {
        let highlighted = code;
        
        const keywords = ['егер', 'барлық', 'функция', 'қайту', 'басып_шығару', 'дейін'];
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\\\b${keyword}\\\\b`, 'g');
            highlighted = highlighted.replace(regex, `<span class="keyword">${keyword}</span>`);
        });
        
        highlighted = highlighted.replace(/"[^"]*"/g, match => `<span class="string">${match}</span>`);
        highlighted = highlighted.replace(/\\b\\d+\\b/g, match => `<span class="number">${match}</span>`);
        highlighted = highlighted.replace(/#[^\\n]*/g, match => `<span class="comment">${match}</span>`);
        
        return highlighted;
    },

    /**
     * 生成示例代码
     */
    getExamples() {
        return {
            hello: `# Бірінші бағдарлама
басып_шығару("Сәлем, Әлем!");`,
            
            variables: `# Айнымалыларды қолдану
х = 5;
у = 10;
қосынды = х + у;
басып_шығару(қосынды);`,
            
            conditions: `# Шартты операторлар
х = 15;
егер х > 10: басып_шығару("х үлкен");`,
            
            math: `# Математика
а = 20;
б = 4;
басып_шығару(а + б);
басып_шығару(а - б);
басып_шығару(а * б);
басып_шығару(а / б);`
        };
    }
};

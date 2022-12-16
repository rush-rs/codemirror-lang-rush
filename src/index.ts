import { completeFromList } from '@codemirror/autocomplete'
import {
    delimitedIndent,
    foldInside,
    foldNodeProp,
    indentNodeProp,
    LanguageSupport,
    LRLanguage,
} from '@codemirror/language'
import { styleTags, tags as t } from '@lezer/highlight'
import { parser } from './syntax.grammar'

export const rushLanguage = LRLanguage.define({
    parser: parser.configure({
        props: [
            indentNodeProp.add({
                Application: delimitedIndent({ closing: ')', align: false }),
            }),
            foldNodeProp.add({
                Application: foldInside,
            }),
            styleTags({
                'for while loop if else return break continue': t.controlKeyword,
                'let fn mut': t.definitionKeyword,
                as: t.keyword,
                Bool: t.bool,
                'VariableName/Ident': t.variableName,
                'CallExpr/VariableName/Ident': t.function(t.variableName),
                CallExpr: t.function(t.propertyName),
                'CastExpr/Type': t.typeName,
                'LetStmt/Type': t.typeName,
                'FunctionDefinition/Ident': t.function(t.variableName),
                'Parameters/Ident': t.local(t.variableName),
                LineComment: t.lineComment,
                BlockComment: t.blockComment,
                Number: t.number,
                Char: t.character,
                '+ - "*" "/" % "**"': t.arithmeticOperator,
                '|| &&': t.logicOperator,
                '< <= > >= "!=" ==': t.compareOperator,
                '=': t.definitionOperator,
                '( ) { }': t.bracket,
                '. , ;': t.separator,
                BuiltinFunc: t.standard(t.function(t.variableName)),
            }),
        ],
    }),
    languageData: {
        commentTokens: { line: '//' },
    },
})

export const rushCompletion = rushLanguage.data.of({
    autocomplete: completeFromList([
        { label: 'fn', type: 'keyword' },
        { label: 'let', type: 'keyword' },
        { label: 'return', type: 'keyword' },
        { label: 'break', type: 'keyword' },
        { label: 'continue', type: 'keyword' },
        { label: 'if', type: 'keyword' },
        { label: 'else', type: 'keyword' },
        { label: 'loop', type: 'keyword' },
        { label: 'while', type: 'keyword' },
        { label: 'for', type: 'keyword' },
    ]),
})

export function rush() {
    return new LanguageSupport(rushLanguage, [rushCompletion])
}

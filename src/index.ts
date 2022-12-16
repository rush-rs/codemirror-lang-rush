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
                in: t.operatorKeyword,
                'let fn mut': t.definitionKeyword,
                as: t.keyword,
                Bool: t.bool,
                null: t.null,
                Type: t.typeName,
                'VariableName/Ident': t.variableName,
                'CallExpr/VariableName/Ident': t.function(t.variableName),
                Property: t.propertyName,
                'CallExpr/MemberExpr/Property': t.function(t.propertyName),
                'FnExpr/Ident': t.function(t.variableName),
                'Parameters/Ident': t.local(t.variableName),
                LineComment: t.lineComment,
                BlockComment: t.blockComment,
                Number: t.number,
                Char: t.character,
                '+ - "*" "/" % "**"': t.arithmeticOperator,
                '|| &&': t.logicOperator,
                '< <= > >= "!=" ==': t.compareOperator,
                '=': t.definitionOperator,
                '( ) { } [ ]': t.bracket,
                '. , ;': t.separator,
                BuiltinFunc: t.standard(t.function(t.variableName)),
                BuiltinVar: t.standard(t.variableName),
            }),
        ],
    }),
    languageData: {
        commentTokens: { line: '//' },
    },
})

export function rush() {
    return new LanguageSupport(rushLanguage)
}

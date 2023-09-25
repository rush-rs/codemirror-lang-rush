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
                'solange falls sonst überweise abbrechen weitermachen beantrage': t.controlKeyword,
                'setze ändere funk auf von': t.definitionKeyword,
                'ergibt': t.typeOperator,
                als: t.keyword,
                Bool: t.bool,
                'BeantrageStmt/BeantrageFn/Ident': t.namespace,
                'BeantrageStmt/BeantrageModule/Ident': t.namespace,
                'VariableName/Ident': t.variableName,
                'CallExpr/VariableName/Ident': t.function(t.variableName),
                CallExpr: t.function(t.propertyName),
                Type: t.typeName,
                'FunctionDefinition/Ident': t.labelName,
                'Parameters/Ident': t.local(t.variableName),
                LineComment: t.lineComment,
                BlockComment: t.blockComment,
                Number: t.number,
                Char: t.character,
                String: t.string,
                '+ - "*" % "**" :': t.arithmeticOperator,
                '|| &&': t.logicOperator,
                '< <= > >= "!=" ==': t.compareOperator,
                '=': t.definitionOperator,
                '( ) { }': t.bracket,
                '. , ; "/"': t.separator,
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
        { label: 'funk', type: 'keyword' },
        { label: 'setze', type: 'keyword' },
        { label: 'überweise', type: 'keyword' },
        { label: 'abbrechen', type: 'keyword' },
        { label: 'weitermachen', type: 'keyword' },
        { label: 'falls', type: 'keyword' },
        { label: 'sont', type: 'keyword' },
        { label: 'solange', type: 'keyword' },
    ]),
})

export function rush() {
    return new LanguageSupport(rushLanguage, [rushCompletion])
}

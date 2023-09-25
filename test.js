import {rushLanguage} from './dist/index.js'
import {testTree} from "@lezer/generator/test"

let ast = rushLanguage.parser.parse("let a = 1 + 2 - 1")
let spec = `
`

testTree(ast, spec)

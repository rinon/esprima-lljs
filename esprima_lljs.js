(function (exports) {
  const $M = require('memory');
  $M.set_memcheck(false);
  var malloc;
  if (typeof process !== 'undefined') {
    malloc = require('memory').malloc;
  } else {
    malloc = memory.malloc;
  }
  const VAR_KIND_VAR = 0;
  const VAR_KIND_LET = 1;
  const VAR_KIND_CONST = 2;
  const OBJECT_KIND_INIT = 0;
  const OBJECT_KIND_GET = 1;
  const OBJECT_KIND_SET = 2;
  (function (exports) {
    const $malloc = $M.malloc, $U1 = $M.U1;
    'use strict';
    var Token, TokenName, SyntaxStrings, PropertyKind, Messages, Regex, source, strict, index, lineNumber, lineStart, length, buffer, state, extra;
    Token = {
      BooleanLiteral: 1,
      EOF: 2,
      Identifier: 3,
      Keyword: 4,
      NullLiteral: 5,
      NumericLiteral: 6,
      Punctuator: 7,
      StringLiteral: 8
    };
    TokenName = {};
    TokenName[Token.BooleanLiteral] = 'Boolean';
    TokenName[Token.EOF] = '<end>';
    TokenName[Token.Identifier] = 'Identifier';
    TokenName[Token.Keyword] = 'Keyword';
    TokenName[Token.NullLiteral] = 'Null';
    TokenName[Token.NumericLiteral] = 'Numeric';
    TokenName[Token.Punctuator] = 'Punctuator';
    TokenName[Token.StringLiteral] = 'String';
    SyntaxStrings = {
      AssignmentExpression: 'AssignmentExpression',
      ArrayExpression: 'ArrayExpression',
      BlockStatement: 'BlockStatement',
      BinaryExpression: 'BinaryExpression',
      BreakStatement: 'BreakStatement',
      CallExpression: 'CallExpression',
      CatchClause: 'CatchClause',
      ConditionalExpression: 'ConditionalExpression',
      ContinueStatement: 'ContinueStatement',
      DoWhileStatement: 'DoWhileStatement',
      DebuggerStatement: 'DebuggerStatement',
      EmptyStatement: 'EmptyStatement',
      ExpressionStatement: 'ExpressionStatement',
      ForStatement: 'ForStatement',
      ForInStatement: 'ForInStatement',
      FunctionDeclaration: 'FunctionDeclaration',
      FunctionExpression: 'FunctionExpression',
      Identifier: 'Identifier',
      IfStatement: 'IfStatement',
      Literal: 'Literal',
      LabeledStatement: 'LabeledStatement',
      LogicalExpression: 'LogicalExpression',
      MemberExpression: 'MemberExpression',
      NewExpression: 'NewExpression',
      ObjectExpression: 'ObjectExpression',
      Program: 'Program',
      Property: 'Property',
      ReturnStatement: 'ReturnStatement',
      SequenceExpression: 'SequenceExpression',
      SwitchStatement: 'SwitchStatement',
      SwitchCase: 'SwitchCase',
      ThisExpression: 'ThisExpression',
      ThrowStatement: 'ThrowStatement',
      TryStatement: 'TryStatement',
      UnaryExpression: 'UnaryExpression',
      UpdateExpression: 'UpdateExpression',
      VariableDeclaration: 'VariableDeclaration',
      VariableDeclarator: 'VariableDeclarator',
      WhileStatement: 'WhileStatement',
      WithStatement: 'WithStatement'
    };
    var Syntax = $malloc(42);
    $U1[Syntax] = 0;
    $U1[Syntax + 1] = 1;
    $U1[Syntax + 2] = 2;
    $U1[Syntax + 3] = 3;
    $U1[Syntax + 4] = 4;
    $U1[Syntax + 5] = 5;
    $U1[Syntax + 6] = 6;
    $U1[Syntax + 7] = 7;
    $U1[Syntax + 8] = 8;
    $U1[Syntax + 9] = 9;
    $U1[Syntax + 10] = 10;
    $U1[Syntax + 11] = 11;
    $U1[Syntax + 12] = 12;
    $U1[Syntax + 13] = 13;
    $U1[Syntax + 14] = 14;
    $U1[Syntax + 15] = 15;
    $U1[Syntax + 16] = 16;
    $U1[Syntax + 17] = 17;
    $U1[Syntax + 18] = 18;
    $U1[Syntax + 19] = 19;
    $U1[Syntax + 20] = 20;
    $U1[Syntax + 21] = 21;
    $U1[Syntax + 22] = 22;
    $U1[Syntax + 23] = 23;
    $U1[Syntax + 24] = 24;
    $U1[Syntax + 25] = 25;
    $U1[Syntax + 26] = 26;
    $U1[Syntax + 27] = 27;
    $U1[Syntax + 28] = 28;
    $U1[Syntax + 29] = 29;
    $U1[Syntax + 30] = 30;
    $U1[Syntax + 31] = 31;
    $U1[Syntax + 32] = 32;
    $U1[Syntax + 33] = 33;
    $U1[Syntax + 34] = 34;
    $U1[Syntax + 35] = 35;
    $U1[Syntax + 36] = 36;
    $U1[Syntax + 37] = 37;
    $U1[Syntax + 38] = 38;
    $U1[Syntax + 39] = 39;
    $U1[Syntax + 40] = 40;
    $U1[Syntax + 41] = 41;
    PropertyKind = {
      Data: 1,
      Get: 2,
      Set: 4
    };
    // Error messages should be identical to V8.
    Messages = {
      UnexpectedToken: 'Unexpected token %0',
      UnexpectedNumber: 'Unexpected number',
      UnexpectedString: 'Unexpected string',
      UnexpectedIdentifier: 'Unexpected identifier',
      UnexpectedReserved: 'Unexpected reserved word',
      UnexpectedEOS: 'Unexpected end of input',
      NewlineAfterThrow: 'Illegal newline after throw',
      InvalidRegExp: 'Invalid regular expression',
      UnterminatedRegExp: 'Invalid regular expression: missing /',
      InvalidLHSInAssignment: 'Invalid left-hand side in assignment',
      InvalidLHSInForIn: 'Invalid left-hand side in for-in',
      MultipleDefaultsInSwitch: 'More than one default clause in switch statement',
      NoCatchOrFinally: 'Missing catch or finally after try',
      UnknownLabel: 'Undefined label \'%0\'',
      Redeclaration: '%0 \'%1\' has already been declared',
      IllegalContinue: 'Illegal continue statement',
      IllegalBreak: 'Illegal break statement',
      IllegalReturn: 'Illegal return statement',
      StrictModeWith: 'Strict mode code may not include a with statement',
      StrictCatchVariable: 'Catch variable may not be eval or arguments in strict mode',
      StrictVarName: 'Variable name may not be eval or arguments in strict mode',
      StrictParamName: 'Parameter name eval or arguments is not allowed in strict mode',
      StrictParamDupe: 'Strict mode function may not have duplicate parameter names',
      StrictFunctionName: 'Function name may not be eval or arguments in strict mode',
      StrictOctalLiteral: 'Octal literals are not allowed in strict mode.',
      StrictDelete: 'Delete of an unqualified identifier in strict mode.',
      StrictDuplicateProperty: 'Duplicate data property in object literal not allowed in strict mode',
      AccessorDataProperty: 'Object literal may not have data and accessor property with the same name',
      AccessorGetSet: 'Object literal may not have multiple get/set accessors with the same name',
      StrictLHSAssignment: 'Assignment to eval or arguments is not allowed in strict mode',
      StrictLHSPostfix: 'Postfix increment/decrement may not have eval or arguments operand in strict mode',
      StrictLHSPrefix: 'Prefix increment/decrement may not have eval or arguments operand in strict mode',
      StrictReservedWord: 'Use of future reserved word in strict mode'
    };
    // See also tools/generate-unicode-regex.py.
    Regex = {
      NonAsciiIdentifierStart: new RegExp('[\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]'),
      NonAsciiIdentifierPart: new RegExp('[\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0300-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u0483-\u0487\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u05d0-\u05ea\u05f0-\u05f2\u0610-\u061a\u0620-\u0669\u066e-\u06d3\u06d5-\u06dc\u06df-\u06e8\u06ea-\u06fc\u06ff\u0710-\u074a\u074d-\u07b1\u07c0-\u07f5\u07fa\u0800-\u082d\u0840-\u085b\u08a0\u08a2-\u08ac\u08e4-\u08fe\u0900-\u0963\u0966-\u096f\u0971-\u0977\u0979-\u097f\u0981-\u0983\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bc-\u09c4\u09c7\u09c8\u09cb-\u09ce\u09d7\u09dc\u09dd\u09df-\u09e3\u09e6-\u09f1\u0a01-\u0a03\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a59-\u0a5c\u0a5e\u0a66-\u0a75\u0a81-\u0a83\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abc-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ad0\u0ae0-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3c-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5c\u0b5d\u0b5f-\u0b63\u0b66-\u0b6f\u0b71\u0b82\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd0\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c58\u0c59\u0c60-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbc-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0cde\u0ce0-\u0ce3\u0ce6-\u0cef\u0cf1\u0cf2\u0d02\u0d03\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d-\u0d44\u0d46-\u0d48\u0d4a-\u0d4e\u0d57\u0d60-\u0d63\u0d66-\u0d6f\u0d7a-\u0d7f\u0d82\u0d83\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e01-\u0e3a\u0e40-\u0e4e\u0e50-\u0e59\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb9\u0ebb-\u0ebd\u0ec0-\u0ec4\u0ec6\u0ec8-\u0ecd\u0ed0-\u0ed9\u0edc-\u0edf\u0f00\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e-\u0f47\u0f49-\u0f6c\u0f71-\u0f84\u0f86-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1049\u1050-\u109d\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u135d-\u135f\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176c\u176e-\u1770\u1772\u1773\u1780-\u17d3\u17d7\u17dc\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1820-\u1877\u1880-\u18aa\u18b0-\u18f5\u1900-\u191c\u1920-\u192b\u1930-\u193b\u1946-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u19d0-\u19d9\u1a00-\u1a1b\u1a20-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1aa7\u1b00-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1bf3\u1c00-\u1c37\u1c40-\u1c49\u1c4d-\u1c7d\u1cd0-\u1cd2\u1cd4-\u1cf6\u1d00-\u1de6\u1dfc-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u200c\u200d\u203f\u2040\u2054\u2071\u207f\u2090-\u209c\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d7f-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2de0-\u2dff\u2e2f\u3005-\u3007\u3021-\u302f\u3031-\u3035\u3038-\u303c\u3041-\u3096\u3099\u309a\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua62b\ua640-\ua66f\ua674-\ua67d\ua67f-\ua697\ua69f-\ua6f1\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua827\ua840-\ua873\ua880-\ua8c4\ua8d0-\ua8d9\ua8e0-\ua8f7\ua8fb\ua900-\ua92d\ua930-\ua953\ua960-\ua97c\ua980-\ua9c0\ua9cf-\ua9d9\uaa00-\uaa36\uaa40-\uaa4d\uaa50-\uaa59\uaa60-\uaa76\uaa7a\uaa7b\uaa80-\uaac2\uaadb-\uaadd\uaae0-\uaaef\uaaf2-\uaaf6\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabea\uabec\uabed\uabf0-\uabf9\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\ufe70-\ufe74\ufe76-\ufefc\uff10-\uff19\uff21-\uff3a\uff3f\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]')
    };
    function castExpression(obj, fromType) {
      const $malloc = $M.malloc, $U1 = $M.U1, $U4 = $M.U4;
      var expr = $malloc(8) >> 2;
      $U1[expr << 2] = fromType;
      switch (fromType) {
      case $U1[Syntax + 1]:
        $U4[expr + 1] = obj;
        break;
      case $U1[Syntax + 24]:
        $U4[expr + 1] = obj;
        break;
      case $U1[Syntax + 16]:
        $U4[expr + 1] = obj;
        break;
      case $U1[Syntax + 28]:
        $U4[expr + 1] = obj;
        break;
      case $U1[Syntax + 34]:
        $U4[expr + 1] = obj;
        break;
      case $U1[Syntax + 3]:
        $U4[expr + 1] = obj;
        break;
      case $U1[Syntax]:
        $U4[expr + 1] = obj;
        break;
      case $U1[Syntax + 35]:
        $U4[expr + 1] = obj;
        break;
      case $U1[Syntax + 21]:
        $U4[expr + 1] = obj;
        break;
      case $U1[Syntax + 7]:
        $U4[expr + 1] = obj;
        break;
      case $U1[Syntax + 23]:
        $U4[expr + 1] = obj;
        break;
      case $U1[Syntax + 5]:
        $U4[expr + 1] = obj;
        break;
      case $U1[Syntax + 22]:
        $U4[expr + 1] = obj;
        break;
      case $U1[Syntax + 17]:
        $U4[expr + 1] = obj;
        break;
      case $U1[Syntax + 19]:
        $U4[expr + 1] = obj;
        break;
      default:
        throw new Error('Unknown type to cast: ' + fromType);
      }
      return expr;
    }
    function castPattern(obj, fromType) {
      const $malloc = $M.malloc, $U1 = $M.U1, $U4 = $M.U4;
      var pattern = $malloc(8) >> 2;
      $U1[pattern << 2] = fromType;
      switch (fromType) {
      case $U1[Syntax + 40]:
        $U4[pattern + 1] = obj;
        break;
      case $U1[Syntax + 17]:
        $U4[pattern + 1] = obj;
        break;
      default:
        throw new Error('Unknown type to cast: ' + fromType);
      }
      return pattern;
    }
    function castStatement(obj, fromType) {
      const $malloc = $M.malloc, $U1 = $M.U1, $U4 = $M.U4;
      var statement = $malloc(8) >> 2;
      $U1[statement << 2] = fromType;
      switch (fromType) {
      case $U1[Syntax + 2]:
        $U4[statement + 1] = obj;
        break;
      case $U1[Syntax + 12]:
        $U4[statement + 1] = obj;
        break;
      case $U1[Syntax + 18]:
        $U4[statement + 1] = obj;
        break;
      case $U1[Syntax + 20]:
        $U4[statement + 1] = obj;
        break;
      case $U1[Syntax + 4]:
        $U4[statement + 1] = obj;
        break;
      case $U1[Syntax + 8]:
        $U4[statement + 1] = obj;
        break;
      case $U1[Syntax + 39]:
        $U4[statement + 1] = obj;
        break;
      case $U1[Syntax + 29]:
        $U4[statement + 1] = obj;
        break;
      case $U1[Syntax + 27]:
        $U4[statement + 1] = obj;
        break;
      case $U1[Syntax + 32]:
        $U4[statement + 1] = obj;
        break;
      case $U1[Syntax + 33]:
        $U4[statement + 1] = obj;
        break;
      case $U1[Syntax + 38]:
        $U4[statement + 1] = obj;
        break;
      case $U1[Syntax + 9]:
        $U4[statement + 1] = obj;
        break;
      case $U1[Syntax + 13]:
        $U4[statement + 1] = obj;
        break;
      case $U1[Syntax + 14]:
        $U4[statement + 1] = obj;
        break;
      case $U1[Syntax + 41]:
        $U4[statement + 1] = obj;
        break;
      case $U1[Syntax + 10]:
        $U4[statement + 1] = obj;
        break;
      case $U1[Syntax + 36]:
        $U4[statement + 1] = obj;
        break;
      case $U1[Syntax + 15]:
        $U4[statement + 1] = obj;
        break;
      default:
        throw new Error('Unknown type to cast: ' + fromType);
      }
      return statement;
    }
    function statementListLength(list) {
      const $U4 = $M.U4;
      var _;
      var l = 0;
      var cur = list;
      while (cur !== 0) {
        cur = $U4[cur + 1];
        _ = l, l = (l + 1 | 0) >>> 0, _;
      }
      return (l - 1 | 0) >>> 0;
    }
    function varDeclListLength(list) {
      const $U4 = $M.U4;
      var _;
      var l = 0;
      var cur = list;
      while (cur !== 0) {
        cur = $U4[cur + 1];
        _ = l, l = (l + 1 | 0) >>> 0, _;
      }
      return (l - 1 | 0) >>> 0;
    }
    function catchClauseListLength(list) {
      const $U4 = $M.U4;
      var _;
      var l = 0;
      var cur = list;
      while (cur !== 0) {
        cur = $U4[cur + 1];
        _ = l, l = (l + 1 | 0) >>> 0, _;
      }
      return (l - 1 | 0) >>> 0;
    }
    // let strByteCount = 0;
    function convertStr(o) {
      const $malloc = $M.malloc, $U4 = $M.U4, $U1 = $M.U1;
      var _;
      var newStr = $malloc(8) >> 2;
      if (!o) {
        $U4[newStr] = 0;
        // strByteCount += 1;
        return newStr;
      }
      var str = o.toString();
      $U4[newStr] = malloc(str.length + 1 >>> 0);
      var cur = $U4[newStr];
      for (var i = 0, l = str.length; i < l; i++) {
        $U1[cur] = str.charCodeAt(i) >>> 0;
        _ = cur, cur = cur + 1, _;
      }
      $U1[cur] = 0;
      // strByteCount += str.length+1;
      return newStr;
    }
    function readStr(str) {
      const $U4 = $M.U4, $U1 = $M.U1;
      var _;
      var varStr = '';
      for (var c = $U4[str]; $U1[c] != 0; _ = c, c = c + 1, _) {
        varStr += String.fromCharCode($U1[c]);
      }
      return varStr;
    }
    function convertOperator(op) {
      switch (op) {
      case '.':
        return 0;
      case 'new':
        return 1;
      case '++':
        return 2;
      case '--':
        return 3;
      case '!':
        return 4;
      case '~':
        return 5;
      case '+':
        return 6;
      case '-':
        return 7;
      case 'typeof':
        return 8;
      case 'void':
        return 9;
      case 'delete':
        return 10;
      case '*':
        return 11;
      case '/':
        return 12;
      case '%':
        return 13;
      case '<<':
        return 14;
      case '>>':
        return 15;
      case '>>>':
        return 16;
      case '<':
        return 17;
      case '<=':
        return 18;
      case '>':
        return 19;
      case '>=':
        return 20;
      case 'in':
        return 21;
      case 'instanceof':
        return 22;
      case '==':
        return 23;
      case '!=':
        return 24;
      case '===':
        return 25;
      case '!==':
        return 26;
      case '&':
        return 27;
      case '^':
        return 28;
      case '|':
        return 29;
      case '&&':
        return 30;
      case '||':
        return 31;
      case '=':
        return 32;
      case '+=':
        return 33;
      case '-=':
        return 34;
      case '*=':
        return 35;
      case '/=':
        return 36;
      case '%=':
        return 37;
      case '<<=':
        return 38;
      case '>>=':
        return 39;
      case '>>>=':
        return 40;
      case '&=':
        return 41;
      case '^=':
        return 42;
      case '|=':
        return 43;
      case ',':
        return 44;
      default:
        throw new Error('Unrecognized operator: ' + op);
      }
    }
    function convertVarKind(str) {
      switch (str) {
      case 'var':
        return VAR_KIND_VAR;
      case 'let':
        return VAR_KIND_LET;
      case 'const':
        return VAR_KIND_CONST;
      }
    }
    // Ensure the condition is true, otherwise throw an error.
    // This is only to have a better contract semantic, i.e. another safety net
    // to catch a logic error. The condition shall be fulfilled in normal case.
    // Do NOT use this to enforce a certain condition on any user input.
    function assert(condition, message) {
      if (!condition) {
        throw new Error('ASSERT: ' + message);
      }
    }
    function sliceSource(from, to) {
      return source.slice(from, to);
    }
    if (typeof 'esprima'[0] === 'undefined') {
      sliceSource = function sliceArraySource(from, to) {
        return source.slice(from, to).join('');
      };
    }
    function isDecimalDigit(ch) {
      return '0123456789'.indexOf(ch) >= 0;
    }
    function isHexDigit(ch) {
      return '0123456789abcdefABCDEF'.indexOf(ch) >= 0;
    }
    function isOctalDigit(ch) {
      return '01234567'.indexOf(ch) >= 0;
    }
    // 7.2 White Space
    function isWhiteSpace(ch) {
      return ch === ' ' || ch === '\t' || ch === '\v' || ch === '\f' || ch === '\xa0' || ch.charCodeAt(0) >= 5760 && '\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\ufeff'.indexOf(ch) >= 0;
    }
    // 7.3 Line Terminators
    function isLineTerminator(ch) {
      return ch === '\n' || ch === '\r' || ch === '\u2028' || ch === '\u2029';
    }
    // 7.6 Identifier Names and Identifiers
    function isIdentifierStart(ch) {
      return ch === '$' || ch === '_' || ch === '\\' || ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z' || ch.charCodeAt(0) >= 128 && Regex.NonAsciiIdentifierStart.test(ch);
    }
    function isIdentifierPart(ch) {
      return ch === '$' || ch === '_' || ch === '\\' || ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z' || ch >= '0' && ch <= '9' || ch.charCodeAt(0) >= 128 && Regex.NonAsciiIdentifierPart.test(ch);
    }
    // 7.6.1.2 Future Reserved Words
    function isFutureReservedWord(id) {
      switch (id) {
      case 'class':
      case 'enum':
      case 'export':
      case 'extends':
      case 'import':
      case 'super':
        return true;
      }
      return false;
    }
    function isStrictModeReservedWord(id) {
      switch (id) {
      case 'implements':
      case 'interface':
      case 'package':
      case 'private':
      case 'protected':
      case 'public':
      case 'static':
      case 'yield':
      case 'let':
        return true;
      }
      return false;
    }
    function isRestrictedWord(id) {
      return id === 'eval' || id === 'arguments';
    }
    // 7.6.1.1 Keywords
    function isKeyword(id) {
      var keyword = false;
      switch (id.length) {
      case 2:
        keyword = id === 'if' || id === 'in' || id === 'do';
        break;
      case 3:
        keyword = id === 'var' || id === 'for' || id === 'new' || id === 'try';
        break;
      case 4:
        keyword = id === 'this' || id === 'else' || id === 'case' || id === 'void' || id === 'with';
        break;
      case 5:
        keyword = id === 'while' || id === 'break' || id === 'catch' || id === 'throw';
        break;
      case 6:
        keyword = id === 'return' || id === 'typeof' || id === 'delete' || id === 'switch';
        break;
      case 7:
        keyword = id === 'default' || id === 'finally';
        break;
      case 8:
        keyword = id === 'function' || id === 'continue' || id === 'debugger';
        break;
      case 10:
        keyword = id === 'instanceof';
        break;
      }
      if (keyword) {
        return true;
      }
      switch (id) {
      case 'const':
        return true;
      case 'yield':
      case 'let':
        return true;
      }
      if (strict && isStrictModeReservedWord(id)) {
        return true;
      }
      return isFutureReservedWord(id);
    }
    // Return the next character and move forward.
    function nextChar() {
      return source[index++];
    }
    // 7.4 Comments
    function skipComment() {
      var ch, blockComment, lineComment;
      blockComment = false;
      lineComment = false;
      while (index < length) {
        ch = source[index];
        if (lineComment) {
          ch = nextChar();
          if (isLineTerminator(ch)) {
            lineComment = false;
            if (ch === '\r' && source[index] === '\n') {
              ++index;
            }
            ++lineNumber;
            lineStart = index;
          }
        } else if (blockComment) {
          if (isLineTerminator(ch)) {
            if (ch === '\r' && source[index + 1] === '\n') {
              ++index;
            }
            ++lineNumber;
            ++index;
            lineStart = index;
            if (index >= length) {
              throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
          } else {
            ch = nextChar();
            if (index >= length) {
              throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
            if (ch === '*') {
              ch = source[index];
              if (ch === '/') {
                ++index;
                blockComment = false;
              }
            }
          }
        } else if (ch === '/') {
          ch = source[index + 1];
          if (ch === '/') {
            index += 2;
            lineComment = true;
          } else if (ch === '*') {
            index += 2;
            blockComment = true;
            if (index >= length) {
              throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
          } else {
            break;
          }
        } else if (isWhiteSpace(ch)) {
          ++index;
        } else if (isLineTerminator(ch)) {
          ++index;
          if (ch === '\r' && source[index] === '\n') {
            ++index;
          }
          ++lineNumber;
          lineStart = index;
        } else {
          break;
        }
      }
    }
    function scanHexEscape(prefix) {
      var i, len, ch, code = 0;
      len = prefix === 'u' ? 4 : 2;
      for (i = 0; i < len; ++i) {
        if (index < length && isHexDigit(source[index])) {
          ch = nextChar();
          code = code * 16 + '0123456789abcdef'.indexOf(ch.toLowerCase());
        } else {
          return '';
        }
      }
      return String.fromCharCode(code);
    }
    function scanIdentifier() {
      var ch, start, id, restore;
      ch = source[index];
      if (!isIdentifierStart(ch)) {
        return;
      }
      start = index;
      if (ch === '\\') {
        ++index;
        if (source[index] !== 'u') {
          return;
        }
        ++index;
        restore = index;
        ch = scanHexEscape('u');
        if (ch) {
          if (ch === '\\' || !isIdentifierStart(ch)) {
            return;
          }
          id = ch;
        } else {
          index = restore;
          id = 'u';
        }
      } else {
        id = nextChar();
      }
      while (index < length) {
        ch = source[index];
        if (!isIdentifierPart(ch)) {
          break;
        }
        if (ch === '\\') {
          ++index;
          if (source[index] !== 'u') {
            return;
          }
          ++index;
          restore = index;
          ch = scanHexEscape('u');
          if (ch) {
            if (ch === '\\' || !isIdentifierPart(ch)) {
              return;
            }
            id += ch;
          } else {
            index = restore;
            id += 'u';
          }
        } else {
          id += nextChar();
        }
      }
      // There is no keyword or literal with only one character.
      // Thus, it must be an identifier.
      if (id.length === 1) {
        return {
          type: Token.Identifier,
          value: id,
          lineNumber: lineNumber,
          lineStart: lineStart,
          range: [
            start,
            index
          ]
        };
      }
      if (isKeyword(id)) {
        return {
          type: Token.Keyword,
          value: id,
          lineNumber: lineNumber,
          lineStart: lineStart,
          range: [
            start,
            index
          ]
        };
      }
      // 7.8.1 Null Literals
      if (id === 'null') {
        return {
          type: Token.NullLiteral,
          value: id,
          lineNumber: lineNumber,
          lineStart: lineStart,
          range: [
            start,
            index
          ]
        };
      }
      // 7.8.2 Boolean Literals
      if (id === 'true' || id === 'false') {
        return {
          type: Token.BooleanLiteral,
          value: id,
          lineNumber: lineNumber,
          lineStart: lineStart,
          range: [
            start,
            index
          ]
        };
      }
      return {
        type: Token.Identifier,
        value: id,
        lineNumber: lineNumber,
        lineStart: lineStart,
        range: [
          start,
          index
        ]
      };
    }
    // 7.7 Punctuators
    function scanPunctuator() {
      var start = index, ch1 = source[index], ch2, ch3, ch4;
      // Check for most common single-character punctuators.
      if (ch1 === ';' || ch1 === '{' || ch1 === '}') {
        ++index;
        return {
          type: Token.Punctuator,
          value: ch1,
          lineNumber: lineNumber,
          lineStart: lineStart,
          range: [
            start,
            index
          ]
        };
      }
      if (ch1 === ',' || ch1 === '(' || ch1 === ')') {
        ++index;
        return {
          type: Token.Punctuator,
          value: ch1,
          lineNumber: lineNumber,
          lineStart: lineStart,
          range: [
            start,
            index
          ]
        };
      }
      // Dot (.) can also start a floating-point number, hence the need
      // to check the next character.
      ch2 = source[index + 1];
      if (ch1 === '.' && !isDecimalDigit(ch2)) {
        return {
          type: Token.Punctuator,
          value: nextChar(),
          lineNumber: lineNumber,
          lineStart: lineStart,
          range: [
            start,
            index
          ]
        };
      }
      // Peek more characters.
      ch3 = source[index + 2];
      ch4 = source[index + 3];
      // 4-character punctuator: >>>=
      if (ch1 === '>' && ch2 === '>' && ch3 === '>') {
        if (ch4 === '=') {
          index += 4;
          return {
            type: Token.Punctuator,
            value: '>>>=',
            lineNumber: lineNumber,
            lineStart: lineStart,
            range: [
              start,
              index
            ]
          };
        }
      }
      // 3-character punctuators: === !== >>> <<= >>=
      if (ch1 === '=' && ch2 === '=' && ch3 === '=') {
        index += 3;
        return {
          type: Token.Punctuator,
          value: '===',
          lineNumber: lineNumber,
          lineStart: lineStart,
          range: [
            start,
            index
          ]
        };
      }
      if (ch1 === '!' && ch2 === '=' && ch3 === '=') {
        index += 3;
        return {
          type: Token.Punctuator,
          value: '!==',
          lineNumber: lineNumber,
          lineStart: lineStart,
          range: [
            start,
            index
          ]
        };
      }
      if (ch1 === '>' && ch2 === '>' && ch3 === '>') {
        index += 3;
        return {
          type: Token.Punctuator,
          value: '>>>',
          lineNumber: lineNumber,
          lineStart: lineStart,
          range: [
            start,
            index
          ]
        };
      }
      if (ch1 === '<' && ch2 === '<' && ch3 === '=') {
        index += 3;
        return {
          type: Token.Punctuator,
          value: '<<=',
          lineNumber: lineNumber,
          lineStart: lineStart,
          range: [
            start,
            index
          ]
        };
      }
      if (ch1 === '>' && ch2 === '>' && ch3 === '=') {
        index += 3;
        return {
          type: Token.Punctuator,
          value: '>>=',
          lineNumber: lineNumber,
          lineStart: lineStart,
          range: [
            start,
            index
          ]
        };
      }
      // 2-character punctuators: <= >= == != ++ -- << >> && ||
      // += -= *= %= &= |= ^= /=
      if (ch2 === '=') {
        if ('<>=!+-*%&|^/'.indexOf(ch1) >= 0) {
          index += 2;
          return {
            type: Token.Punctuator,
            value: ch1 + ch2,
            lineNumber: lineNumber,
            lineStart: lineStart,
            range: [
              start,
              index
            ]
          };
        }
      }
      if (ch1 === ch2 && '+-<>&|'.indexOf(ch1) >= 0) {
        if ('+-<>&|'.indexOf(ch2) >= 0) {
          index += 2;
          return {
            type: Token.Punctuator,
            value: ch1 + ch2,
            lineNumber: lineNumber,
            lineStart: lineStart,
            range: [
              start,
              index
            ]
          };
        }
      }
      // The remaining 1-character punctuators.
      if ('[]<>+-*%&|^!~?:=/'.indexOf(ch1) >= 0) {
        return {
          type: Token.Punctuator,
          value: nextChar(),
          lineNumber: lineNumber,
          lineStart: lineStart,
          range: [
            start,
            index
          ]
        };
      }
    }
    // 7.8.3 Numeric Literals
    function scanNumericLiteral() {
      var number, start, ch;
      ch = source[index];
      assert(isDecimalDigit(ch) || ch === '.', 'Numeric literal must start with a decimal digit or a decimal point');
      start = index;
      number = '';
      if (ch !== '.') {
        number = nextChar();
        ch = source[index];
        // Hex number starts with '0x'.
        // Octal number starts with '0'.
        if (number === '0') {
          if (ch === 'x' || ch === 'X') {
            number += nextChar();
            while (index < length) {
              ch = source[index];
              if (!isHexDigit(ch)) {
                break;
              }
              number += nextChar();
            }
            if (number.length <= 2) {
              // only 0x
              throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
            if (index < length) {
              ch = source[index];
              if (isIdentifierStart(ch)) {
                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
              }
            }
            return {
              type: Token.NumericLiteral,
              value: parseInt(number, 16),
              lineNumber: lineNumber,
              lineStart: lineStart,
              range: [
                start,
                index
              ]
            };
          } else if (isOctalDigit(ch)) {
            number += nextChar();
            while (index < length) {
              ch = source[index];
              if (!isOctalDigit(ch)) {
                break;
              }
              number += nextChar();
            }
            if (index < length) {
              ch = source[index];
              if (isIdentifierStart(ch) || isDecimalDigit(ch)) {
                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
              }
            }
            return {
              type: Token.NumericLiteral,
              value: parseInt(number, 8),
              octal: true,
              lineNumber: lineNumber,
              lineStart: lineStart,
              range: [
                start,
                index
              ]
            };
          }
          // decimal number starts with '0' such as '09' is illegal.
          if (isDecimalDigit(ch)) {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
          }
        }
        while (index < length) {
          ch = source[index];
          if (!isDecimalDigit(ch)) {
            break;
          }
          number += nextChar();
        }
      }
      if (ch === '.') {
        number += nextChar();
        while (index < length) {
          ch = source[index];
          if (!isDecimalDigit(ch)) {
            break;
          }
          number += nextChar();
        }
      }
      if (ch === 'e' || ch === 'E') {
        number += nextChar();
        ch = source[index];
        if (ch === '+' || ch === '-') {
          number += nextChar();
        }
        ch = source[index];
        if (isDecimalDigit(ch)) {
          number += nextChar();
          while (index < length) {
            ch = source[index];
            if (!isDecimalDigit(ch)) {
              break;
            }
            number += nextChar();
          }
        } else {
          ch = 'character ' + ch;
          if (index >= length) {
            ch = '<end>';
          }
          throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
        }
      }
      if (index < length) {
        ch = source[index];
        if (isIdentifierStart(ch)) {
          throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
        }
      }
      return {
        type: Token.NumericLiteral,
        value: parseFloat(number),
        lineNumber: lineNumber,
        lineStart: lineStart,
        range: [
          start,
          index
        ]
      };
    }
    // 7.8.4 String Literals
    function scanStringLiteral() {
      var str = '', quote, start, ch, code, unescaped, restore, octal = false;
      quote = source[index];
      assert(quote === '\'' || quote === '"', 'String literal must starts with a quote');
      start = index;
      ++index;
      while (index < length) {
        ch = nextChar();
        if (ch === quote) {
          quote = '';
          break;
        } else if (ch === '\\') {
          ch = nextChar();
          if (!isLineTerminator(ch)) {
            switch (ch) {
            case 'n':
              str += '\n';
              break;
            case 'r':
              str += '\r';
              break;
            case 't':
              str += '\t';
              break;
            case 'u':
            case 'x':
              restore = index;
              unescaped = scanHexEscape(ch);
              if (unescaped) {
                str += unescaped;
              } else {
                index = restore;
                str += ch;
              }
              break;
            case 'b':
              str += '\b';
              break;
            case 'f':
              str += '\f';
              break;
            case 'v':
              str += '\v';
              break;
            default:
              if (isOctalDigit(ch)) {
                code = '01234567'.indexOf(ch);
                // \0 is not octal escape sequence
                if (code !== 0) {
                  octal = true;
                }
                if (index < length && isOctalDigit(source[index])) {
                  octal = true;
                  code = code * 8 + '01234567'.indexOf(nextChar());
                  // 3 digits are only allowed when string starts
                  // with 0, 1, 2, 3
                  if ('0123'.indexOf(ch) >= 0 && index < length && isOctalDigit(source[index])) {
                    code = code * 8 + '01234567'.indexOf(nextChar());
                  }
                }
                str += String.fromCharCode(code);
              } else {
                str += ch;
              }
              break;
            }
          } else {
            ++lineNumber;
            if (ch === '\r' && source[index] === '\n') {
              ++index;
            }
          }
        } else if (isLineTerminator(ch)) {
          break;
        } else {
          str += ch;
        }
      }
      if (quote !== '') {
        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
      }
      return {
        type: Token.StringLiteral,
        value: str,
        octal: octal,
        lineNumber: lineNumber,
        lineStart: lineStart,
        range: [
          start,
          index
        ]
      };
    }
    function scanRegExp() {
      var str = '', ch, start, pattern, flags, value, classMarker = false, restore;
      buffer = null;
      skipComment();
      start = index;
      ch = source[index];
      assert(ch === '/', 'Regular expression literal must start with a slash');
      str = nextChar();
      while (index < length) {
        ch = nextChar();
        str += ch;
        if (classMarker) {
          if (ch === ']') {
            classMarker = false;
          }
        } else {
          if (ch === '\\') {
            ch = nextChar();
            // ECMA-262 7.8.5
            if (isLineTerminator(ch)) {
              throwError({}, Messages.UnterminatedRegExp);
            }
            str += ch;
          } else if (ch === '/') {
            break;
          } else if (ch === '[') {
            classMarker = true;
          } else if (isLineTerminator(ch)) {
            throwError({}, Messages.UnterminatedRegExp);
          }
        }
      }
      if (str.length === 1) {
        throwError({}, Messages.UnterminatedRegExp);
      }
      // Exclude leading and trailing slash.
      pattern = str.substr(1, str.length - 2);
      flags = '';
      while (index < length) {
        ch = source[index];
        if (!isIdentifierPart(ch)) {
          break;
        }
        ++index;
        if (ch === '\\' && index < length) {
          ch = source[index];
          if (ch === 'u') {
            ++index;
            restore = index;
            ch = scanHexEscape('u');
            if (ch) {
              flags += ch;
              str += '\\u';
              for (; restore < index; ++restore) {
                str += source[restore];
              }
            } else {
              index = restore;
              flags += 'u';
              str += '\\u';
            }
          } else {
            str += '\\';
          }
        } else {
          flags += ch;
          str += ch;
        }
      }
      try {
        value = new RegExp(pattern, flags);
      } catch (e) {
        throwError({}, Messages.InvalidRegExp);
      }
      return {
        literal: str,
        value: value,
        range: [
          start,
          index
        ]
      };
    }
    function isIdentifierName(token) {
      return token.type === Token.Identifier || token.type === Token.Keyword || token.type === Token.BooleanLiteral || token.type === Token.NullLiteral;
    }
    function advance() {
      var ch, token;
      skipComment();
      if (index >= length) {
        return {
          type: Token.EOF,
          lineNumber: lineNumber,
          lineStart: lineStart,
          range: [
            index,
            index
          ]
        };
      }
      token = scanPunctuator();
      if (typeof token !== 'undefined') {
        return token;
      }
      ch = source[index];
      if (ch === '\'' || ch === '"') {
        return scanStringLiteral();
      }
      if (ch === '.' || isDecimalDigit(ch)) {
        return scanNumericLiteral();
      }
      token = scanIdentifier();
      if (typeof token !== 'undefined') {
        return token;
      }
      throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
    }
    function lex() {
      var token;
      if (buffer) {
        index = buffer.range[1];
        lineNumber = buffer.lineNumber;
        lineStart = buffer.lineStart;
        token = buffer;
        buffer = null;
        return token;
      }
      buffer = null;
      return advance();
    }
    function lookahead() {
      var pos, line, start;
      if (buffer !== null) {
        return buffer;
      }
      pos = index;
      line = lineNumber;
      start = lineStart;
      buffer = advance();
      index = pos;
      lineNumber = line;
      lineStart = start;
      return buffer;
    }
    // Return true if there is a line terminator before the next token.
    function peekLineTerminator() {
      var pos, line, start, found;
      pos = index;
      line = lineNumber;
      start = lineStart;
      skipComment();
      found = lineNumber !== line;
      index = pos;
      lineNumber = line;
      lineStart = start;
      return found;
    }
    // Throw an exception
    function throwError(token, messageFormat) {
      var error, args = Array.prototype.slice.call(arguments, 2), msg = messageFormat.replace(/%(\d)/g, function (whole, index) {
          return args[index] || '';
        });
      if (typeof token.lineNumber === 'number') {
        error = new Error('Line ' + token.lineNumber + ': ' + msg);
        error.index = token.range[0];
        error.lineNumber = token.lineNumber;
        error.column = token.range[0] - lineStart + 1;
      } else {
        error = new Error('Line ' + lineNumber + ': ' + msg);
        error.index = index;
        error.lineNumber = lineNumber;
        error.column = index - lineStart + 1;
      }
      throw error;
    }
    function throwErrorTolerant() {
      try {
        throwError.apply(null, arguments);
      } catch (e) {
        if (extra.errors) {
          extra.errors.push(e);
        } else {
          throw e;
        }
      }
    }
    // Throw an exception because of the token.
    function throwUnexpected(token) {
      if (token.type === Token.EOF) {
        throwError(token, Messages.UnexpectedEOS);
      }
      if (token.type === Token.NumericLiteral) {
        throwError(token, Messages.UnexpectedNumber);
      }
      if (token.type === Token.StringLiteral) {
        throwError(token, Messages.UnexpectedString);
      }
      if (token.type === Token.Identifier) {
        throwError(token, Messages.UnexpectedIdentifier);
      }
      if (token.type === Token.Keyword) {
        if (isFutureReservedWord(token.value)) {
          throwError(token, Messages.UnexpectedReserved);
        } else if (strict && isStrictModeReservedWord(token.value)) {
          throwError(token, Messages.StrictReservedWord);
        }
        throwError(token, Messages.UnexpectedToken, token.value);
      }
      // BooleanLiteral, NullLiteral, or Punctuator.
      throwError(token, Messages.UnexpectedToken, token.value);
    }
    // Expect the next token to match the specified punctuator.
    // If not, an exception will be thrown.
    function expect(value) {
      var token = lex();
      if (token.type !== Token.Punctuator || token.value !== value) {
        throwUnexpected(token);
      }
    }
    // Expect the next token to match the specified keyword.
    // If not, an exception will be thrown.
    function expectKeyword(keyword) {
      var token = lex();
      if (token.type !== Token.Keyword || token.value !== keyword) {
        throwUnexpected(token);
      }
    }
    // Return true if the next token matches the specified punctuator.
    function match(value) {
      var token = lookahead();
      return token.type === Token.Punctuator && token.value === value;
    }
    // Return true if the next token matches the specified keyword
    function matchKeyword(keyword) {
      var token = lookahead();
      return token.type === Token.Keyword && token.value === keyword;
    }
    // Return true if the next token is an assignment operator
    function matchAssign() {
      var token = lookahead(), op = token.value;
      if (token.type !== Token.Punctuator) {
        return false;
      }
      return op === '=' || op === '*=' || op === '/=' || op === '%=' || op === '+=' || op === '-=' || op === '<<=' || op === '>>=' || op === '>>>=' || op === '&=' || op === '^=' || op === '|=';
    }
    function consumeSemicolon() {
      var token, line;
      // Catch the very common case first.
      if (source[index] === ';') {
        lex();
        return;
      }
      line = lineNumber;
      skipComment();
      if (lineNumber !== line) {
        return;
      }
      if (match(';')) {
        lex();
        return;
      }
      token = lookahead();
      if (token.type !== Token.EOF && !match('}')) {
        throwUnexpected(token);
      }
      return;
    }
    // Return true if provided expression is LeftHandSideExpression
    function isLeftHandSide(expr) {
      const $U1 = $M.U1;
      return $U1[expr << 2] === $U1[Syntax + 17] || $U1[expr << 2] === $U1[Syntax + 22];
    }
    // 11.1.4 Array Initialiser
    function parseArrayInitialiser() {
      const $malloc = $M.malloc, $U4 = $M.U4;
      var elements = $malloc(8) >> 2;
      var cur = elements;
      var undef;
      expect('[');
      while (!match(']')) {
        if (match(',')) {
          lex();
          $U4[cur + 1] = $malloc(8) >> 2;
          cur = $U4[cur + 1];
        } else {
          $U4[cur] = parseAssignmentExpression();
          $U4[cur + 1] = $malloc(8) >> 2;
          cur = $U4[cur + 1];
          if (!match(']')) {
            expect(',');
          }
        }
      }
      expect(']');
      var expr = $malloc(4) >> 2;
      $U4[expr] = elements;
      return expr;
    }
    // 11.1.5 Object Initialiser
    function parsePropertyFunction(param, first) {
      const $malloc = $M.malloc, $U4 = $M.U4, $U1 = $M.U1;
      var previousStrict;
      var body = 0;
      previousStrict = strict;
      body = parseFunctionSourceElements();
      if (first && strict && isRestrictedWord(readStr($U4[$U4[$U4[param] + 1]]))) {
        throwError(first, Messages.StrictParamName);
      }
      strict = previousStrict;
      var expr = $malloc(32) >> 2;
      $U4[expr] = 0;
      $U4[expr + 1] = param;
      $U4[expr + 4] = $malloc(8) >> 2;
      $U1[(expr << 2) + 8] = $U1[Syntax + 2];
      $U4[expr + 3] = body;
      $U4[expr + 5] = 0;
      $U1[(expr << 2) + 24] = 0;
      $U1[(expr << 2) + 25] = 0;
      return expr;
    }
    function parseObjectPropertyKey() {
      const $malloc = $M.malloc, $U1 = $M.U1, $U4 = $M.U4;
      var token = lex();
      var ret = $malloc(8) >> 2;
      // Note: This function is called only from parseObjectProperty(), where
      // EOF and Punctuator tokens are already filtered out.
      if (token.type === Token.StringLiteral || token.type === Token.NumericLiteral) {
        if (strict && token.octal) {
          throwError(token, Messages.StrictOctalLiteral);
        }
        $U1[ret << 2] = $U1[Syntax + 19];
        $U4[ret + 1] = createLiteral(token);
        return ret;
      }
      $U1[ret << 2] = $U1[Syntax + 17];
      $U4[ret + 1] = $malloc(4) >> 2;
      $U4[$U4[ret + 1]] = convertStr(token.value);
      return ret;
    }
    function parseObjectProperty() {
      const $malloc = $M.malloc, $U4 = $M.U4, $U1 = $M.U1;
      var token;
      var prop = 0;
      var param = 0;
      var id = 0;
      var key = 0;
      token = lookahead();
      if (token.type === Token.Identifier) {
        id = parseObjectPropertyKey();
        // Property Assignment: Getter and Setter.
        if (token.value === 'get' && !match(':')) {
          key = parseObjectPropertyKey();
          expect('(');
          expect(')');
          prop = $malloc(12) >> 2;
          $U4[prop] = key;
          $U4[prop + 1] = castPattern(parsePropertyFunction($malloc(8) >> 2), $U1[Syntax + 16]);
          $U1[(prop << 2) + 8] = OBJECT_KIND_GET;
          return prop;
        } else if (token.value === 'set' && !match(':')) {
          key = parseObjectPropertyKey();
          expect('(');
          token = lookahead();
          if (token.type !== Token.Identifier) {
            throwUnexpected(lex());
          }
          $U4[param] = castPattern(parseVariableIdentifier(), $U1[Syntax + 17]);
          expect(')');
          prop = $malloc(12) >> 2;
          $U4[prop] = key;
          $U4[prop + 1] = castPattern(castExpression(parsePropertyFunction(param, token), $U1[Syntax + 16]), $U1[Syntax + 40]);
          $U1[(prop << 2) + 8] = OBJECT_KIND_SET;
          return prop;
        } else {
          expect(':');
          prop = $malloc(12) >> 2;
          $U4[prop] = id;
          $U4[prop + 1] = castPattern(parseAssignmentExpression(), $U1[Syntax + 40]);
          $U1[(prop << 2) + 8] = OBJECT_KIND_INIT;
          return prop;
        }
      } else if (token.type === Token.EOF || token.type === Token.Punctuator) {
        throwUnexpected(token);
      } else {
        key = parseObjectPropertyKey();
        expect(':');
        prop = $malloc(12) >> 2;
        $U4[prop] = key;
        $U4[prop + 1] = castPattern(parseAssignmentExpression(), $U1[Syntax + 40]);
        $U1[(prop << 2) + 8] = OBJECT_KIND_INIT;
        return prop;
      }
    }
    function parseObjectInitialiser() {
      const $malloc = $M.malloc, $U4 = $M.U4, $U1 = $M.U1;
      var name, kind, map = {};
      var expr = $malloc(4) >> 2;
      $U4[expr] = $malloc(8) >> 2;
      var curProp = $U4[expr];
      var property = 0;
      expect('{');
      while (!match('}')) {
        property = parseObjectProperty();
        if ($U1[$U4[property] << 2] === $U1[Syntax + 17]) {
          name = $U4[$U4[$U4[property] + 1]];
        } else {
          name = readStr($U4[$U4[$U4[property] + 1] + 1]);
        }
        kind = $U1[(property << 2) + 8] === OBJECT_KIND_INIT ? PropertyKind.Data : $U1[(property << 2) + 8] === OBJECT_KIND_GET ? PropertyKind.Get : PropertyKind.Set;
        if (Object.prototype.hasOwnProperty.call(map, name)) {
          if (map[name] === PropertyKind.Data) {
            if (strict && kind === PropertyKind.Data) {
              throwErrorTolerant({}, Messages.StrictDuplicateProperty);
            } else if (kind !== PropertyKind.Data) {
              throwError({}, Messages.AccessorDataProperty);
            }
          } else {
            if (kind === PropertyKind.Data) {
              throwError({}, Messages.AccessorDataProperty);
            } else if (map[name] & kind) {
              throwError({}, Messages.AccessorGetSet);
            }
          }
          map[name] |= kind;
        } else {
          map[name] = kind;
        }
        $U4[curProp] = property;
        $U4[curProp + 1] = $malloc(8) >> 2;
        curProp = $U4[curProp + 1];
        if (!match('}')) {
          expect(',');
        }
      }
      expect('}');
      return expr;
    }
    // 11.1 Primary Expressions
    function parsePrimaryExpression() {
      const $malloc = $M.malloc, $U4 = $M.U4, $U1 = $M.U1;
      var expr = $malloc(8) >> 2;
      var token = lookahead(), type = token.type;
      if (type === Token.Identifier) {
        var identifier = $malloc(4) >> 2;
        $U4[identifier] = convertStr(lex().value);
        $U1[expr << 2] = $U1[Syntax + 17];
        $U4[expr + 1] = identifier;
        return expr;
      }
      if (type === Token.StringLiteral || type === Token.NumericLiteral) {
        if (strict && token.octal) {
          throwErrorTolerant(token, Messages.StrictOctalLiteral);
        }
        return castExpression(createLiteral(lex()), $U1[Syntax + 19]);
      }
      if (type === Token.Keyword) {
        if (matchKeyword('this')) {
          lex();
          return $malloc(8) >> 2;
        }
        if (matchKeyword('function')) {
          return castExpression(parseFunctionExpression(), $U1[Syntax + 16]);
        }
      }
      if (type === Token.BooleanLiteral) {
        lex();
        token.value = token.value === 'true';
        return castExpression(createLiteral(token), $U1[Syntax + 19]);
      }
      if (type === Token.NullLiteral) {
        lex();
        token.value = null;
        return castExpression(createLiteral(token), $U1[Syntax + 19]);
      }
      if (match('[')) {
        return castExpression(parseArrayInitialiser(), $U1[Syntax + 1]);
      }
      if (match('{')) {
        return castExpression(parseObjectInitialiser(), $U1[Syntax + 24]);
      }
      if (match('(')) {
        lex();
        state.lastParenthesized = expr = parseExpression();
        expect(')');
        return expr;
      }
      if (match('/') || match('/=')) {
        return castExpression(createLiteral(scanRegExp()), $U1[Syntax + 19]);
      }
      throwUnexpected(lex());
    }
    // 11.2 Left-Hand-Side Expressions
    function parseArguments() {
      const $malloc = $M.malloc, $U4 = $M.U4;
      var args = $malloc(8) >> 2;
      var cur = args;
      expect('(');
      if (!match(')')) {
        while (index < length) {
          $U4[cur] = parseAssignmentExpression();
          if (match(')')) {
            break;
          }
          expect(',');
        }
      }
      expect(')');
      return args;
    }
    function parseNonComputedProperty() {
      const $malloc = $M.malloc, $U4 = $M.U4;
      var token = lex();
      if (!isIdentifierName(token)) {
        throwUnexpected(token);
      }
      var identifier = $malloc(4) >> 2;
      $U4[identifier] = convertStr(token.value);
      return identifier;
    }
    function parseNonComputedMember(object) {
      const $malloc = $M.malloc, $U1 = $M.U1, $U4 = $M.U4;
      var member = $malloc(16) >> 2;
      $U1[(member << 2) + 12] = 0;
      $U4[member] = object;
      $U1[(member << 2) + 4] = $U1[Syntax + 17];
      $U4[member + 2] = parseNonComputedProperty();
      return member;
    }
    function parseComputedMember(object) {
      const $malloc = $M.malloc, $U1 = $M.U1, $U4 = $M.U4;
      var expr = 0;
      expect('[');
      expr = $malloc(16) >> 2;
      $U1[(expr << 2) + 12] = 1;
      $U4[expr] = object;
      $U1[(expr << 2) + 4] = $U1[Syntax + 40];
      $U4[expr + 2] = parseExpression();
      expect(']');
      return expr;
    }
    function parseCallMember(object) {
      const $malloc = $M.malloc, $U4 = $M.U4;
      var expr = $malloc(8) >> 2;
      $U4[expr] = object;
      $U4[expr + 1] = parseArguments();
      return expr;
    }
    function parseNewExpression() {
      const $malloc = $M.malloc, $U4 = $M.U4, $U1 = $M.U1;
      expectKeyword('new');
      var newExpr = $malloc(8) >> 2;
      $U4[newExpr] = parseLeftHandSideExpression();
      if (match('(')) {
        $U4[newExpr + 1] = parseArguments();
      }
      return castExpression(newExpr, $U1[Syntax + 23]);
    }
    function parseLeftHandSideExpressionAllowCall() {
      const $U1 = $M.U1;
      var expr = 0;
      var useNew = matchKeyword('new');
      expr = useNew ? parseNewExpression() : parsePrimaryExpression();
      while (index < length) {
        if (match('.')) {
          lex();
          expr = castExpression(parseNonComputedMember(expr), $U1[Syntax + 22]);
        } else if (match('[')) {
          expr = castExpression(parseComputedMember(expr), $U1[Syntax + 22]);
        } else if (match('(')) {
          expr = castExpression(parseCallMember(expr), $U1[Syntax + 5]);
        } else {
          break;
        }
      }
      return expr;
    }
    function parseLeftHandSideExpression() {
      const $U1 = $M.U1;
      var useNew;
      var expr = 0;
      useNew = matchKeyword('new');
      expr = useNew ? parseNewExpression() : parsePrimaryExpression();
      while (index < length) {
        if (match('.')) {
          lex();
          expr = castExpression(parseNonComputedMember(expr), $U1[Syntax + 22]);
        } else if (match('[')) {
          expr = castExpression(parseComputedMember(expr), $U1[Syntax + 22]);
        } else {
          break;
        }
      }
      return expr;
    }
    // 11.3 Postfix Expressions
    function parsePostfixExpression() {
      const $malloc = $M.malloc, $U1 = $M.U1, $U4 = $M.U4;
      var expr = 0;
      expr = parseLeftHandSideExpressionAllowCall();
      if ((match('++') || match('--')) && !peekLineTerminator()) {
        // 11.3.1, 11.3.2
        if (strict && $U1[expr << 2] === $U1[Syntax + 17] && isRestrictedWord($U4[$U4[expr + 1]])) {
          throwError({}, Messages.StrictLHSPostfix);
        }
        if (!isLeftHandSide(expr)) {
          throwError({}, Messages.InvalidLHSInAssignment);
        }
        var newExpr = $malloc(12) >> 2;
        $U1[newExpr << 2] = convertOperator(lex().value);
        $U4[newExpr + 1] = expr;
        $U1[(newExpr << 2) + 8] = 0;
        expr = $malloc(8) >> 2;
        $U1[expr << 2] = $U1[Syntax + 35];
        $U4[expr + 1] = newExpr;
      }
      return expr;
    }
    // 11.4 Unary Operators
    function parseUnaryExpression() {
      const $malloc = $M.malloc, $U1 = $M.U1, $U4 = $M.U4;
      var token;
      var expr = 0;
      if (match('++') || match('--')) {
        token = lex();
        expr = parseUnaryExpression();
        // 11.4.4, 11.4.5
        if (strict && $U1[expr << 2] === $U1[Syntax + 17] && isRestrictedWord($U4[$U4[expr + 1]])) {
          throwError({}, Messages.StrictLHSPrefix);
        }
        if (!isLeftHandSide(expr)) {
          throwError({}, Messages.InvalidLHSInAssignment);
        }
        var update = $malloc(12) >> 2;
        $U1[update << 2] = convertOperator(token.value);
        $U4[update + 1] = expr;
        $U1[(update << 2) + 8] = 1;
        expr = $malloc(8) >> 2;
        $U1[expr << 2] = $U1[Syntax + 35];
        $U4[expr + 1] = update;
        return expr;
      }
      if (match('+') || match('-') || match('~') || match('!')) {
        var unary = $malloc(8) >> 2;
        $U1[unary << 2] = convertOperator(lex().value);
        $U4[unary + 1] = parseUnaryExpression();
        expr = $malloc(8) >> 2;
        $U1[expr << 2] = $U1[Syntax + 34];
        $U4[expr + 1] = unary;
        return expr;
      }
      if (matchKeyword('delete') || matchKeyword('void') || matchKeyword('typeof')) {
        var unary$1 = $malloc(8) >> 2;
        $U1[unary$1 << 2] = convertOperator(lex().value);
        $U4[unary$1 + 1] = parseUnaryExpression();
        expr = $malloc(8) >> 2;
        $U1[expr << 2] = $U1[Syntax + 34];
        $U4[expr + 1] = unary$1;
        if (strict && $U1[unary$1 << 2] === 'delete' && $U1[$U4[unary$1 + 1] << 2] === $U1[Syntax + 17]) {
          throwErrorTolerant({}, Messages.StrictDelete);
        }
        return expr;
      }
      return parsePostfixExpression();
    }
    // 11.5 Multiplicative Operators
    function parseMultiplicativeExpression() {
      const $malloc = $M.malloc, $U1 = $M.U1, $U4 = $M.U4;
      var expr = 0;
      expr = parseUnaryExpression();
      while (match('*') || match('/') || match('%')) {
        var binary = $malloc(12) >> 2;
        $U1[binary << 2] = convertOperator(lex().value);
        $U4[binary + 1] = expr;
        $U4[binary + 2] = parseUnaryExpression();
        expr = $malloc(8) >> 2;
        $U1[expr << 2] = $U1[Syntax + 3];
        $U4[expr + 1] = binary;
      }
      return expr;
    }
    // 11.6 Additive Operators
    function parseAdditiveExpression() {
      const $malloc = $M.malloc, $U1 = $M.U1, $U4 = $M.U4;
      var expr = 0;
      expr = parseMultiplicativeExpression();
      while (match('+') || match('-')) {
        var binary = $malloc(12) >> 2;
        $U1[binary << 2] = convertOperator(lex().value);
        $U4[binary + 1] = expr;
        $U4[binary + 2] = parseMultiplicativeExpression();
        expr = $malloc(8) >> 2;
        $U1[expr << 2] = $U1[Syntax + 3];
        $U4[expr + 1] = binary;
      }
      return expr;
    }
    // 11.7 Bitwise Shift Operators
    function parseShiftExpression() {
      const $malloc = $M.malloc, $U1 = $M.U1, $U4 = $M.U4;
      var expr = 0;
      expr = parseAdditiveExpression();
      while (match('<<') || match('>>') || match('>>>')) {
        var binary = $malloc(12) >> 2;
        $U1[binary << 2] = convertOperator(lex().value);
        $U4[binary + 1] = expr;
        $U4[binary + 2] = parseAdditiveExpression();
        expr = $malloc(8) >> 2;
        $U1[expr << 2] = $U1[Syntax + 3];
        $U4[expr + 1] = binary;
      }
      return expr;
    }
    // 11.8 Relational Operators
    function parseRelationalExpression() {
      const $malloc = $M.malloc, $U1 = $M.U1, $U4 = $M.U4;
      var previousAllowIn;
      var expr = 0;
      previousAllowIn = state.allowIn;
      state.allowIn = true;
      expr = parseShiftExpression();
      while (match('<') || match('>') || match('<=') || match('>=') || previousAllowIn && matchKeyword('in') || matchKeyword('instanceof')) {
        var binary = $malloc(12) >> 2;
        $U1[binary << 2] = convertOperator(lex().value);
        $U4[binary + 1] = expr;
        $U4[binary + 2] = parseShiftExpression();
        expr = $malloc(8) >> 2;
        $U1[expr << 2] = $U1[Syntax + 3];
        $U4[expr + 1] = binary;
      }
      state.allowIn = previousAllowIn;
      return expr;
    }
    // 11.9 Equality Operators
    function parseEqualityExpression() {
      const $malloc = $M.malloc, $U1 = $M.U1, $U4 = $M.U4;
      var expr = 0;
      expr = parseRelationalExpression();
      while (match('==') || match('!=') || match('===') || match('!==')) {
        var binary = $malloc(12) >> 2;
        $U1[binary << 2] = convertOperator(lex().value);
        $U4[binary + 1] = expr;
        $U4[binary + 2] = parseRelationalExpression();
        expr = $malloc(8) >> 2;
        $U1[expr << 2] = $U1[Syntax + 3];
        $U4[expr + 1] = binary;
      }
      return expr;
    }
    // 11.10 Binary Bitwise Operators
    function parseBitwiseANDExpression() {
      const $malloc = $M.malloc, $U1 = $M.U1, $U4 = $M.U4;
      var expr = 0;
      expr = parseEqualityExpression();
      while (match('&')) {
        lex();
        var binary = $malloc(12) >> 2;
        $U1[binary << 2] = convertOperator('&');
        $U4[binary + 1] = expr;
        $U4[binary + 2] = parseEqualityExpression();
        expr = $malloc(8) >> 2;
        $U1[expr << 2] = $U1[Syntax + 3];
        $U4[expr + 1] = binary;
      }
      return expr;
    }
    function parseBitwiseXORExpression() {
      const $malloc = $M.malloc, $U1 = $M.U1, $U4 = $M.U4;
      var expr = 0;
      expr = parseBitwiseANDExpression();
      while (match('^')) {
        lex();
        var binary = $malloc(12) >> 2;
        $U1[binary << 2] = convertOperator('^');
        $U4[binary + 1] = expr;
        $U4[binary + 2] = parseBitwiseANDExpression();
        expr = $malloc(8) >> 2;
        $U1[expr << 2] = $U1[Syntax + 3];
        $U4[expr + 1] = binary;
      }
      return expr;
    }
    function parseBitwiseORExpression() {
      const $malloc = $M.malloc, $U1 = $M.U1, $U4 = $M.U4;
      var expr = 0;
      expr = parseBitwiseXORExpression();
      while (match('|')) {
        lex();
        var binary = $malloc(12) >> 2;
        $U1[binary << 2] = convertOperator('|');
        $U4[binary + 1] = expr;
        $U4[binary + 2] = parseBitwiseXORExpression();
        expr = $malloc(8) >> 2;
        $U1[expr << 2] = $U1[Syntax + 3];
        $U4[expr + 1] = binary;
      }
      return expr;
    }
    // 11.11 Binary Logical Operators
    function parseLogicalANDExpression() {
      const $malloc = $M.malloc, $U1 = $M.U1, $U4 = $M.U4;
      var expr = 0;
      expr = parseBitwiseORExpression();
      while (match('&&')) {
        lex();
        var logical = $malloc(12) >> 2;
        $U1[logical << 2] = convertOperator('&&');
        $U4[logical + 1] = expr;
        $U4[logical + 2] = parseBitwiseORExpression();
        expr = $malloc(8) >> 2;
        $U1[expr << 2] = $U1[Syntax + 21];
        $U4[expr + 1] = logical;
      }
      return expr;
    }
    function parseLogicalORExpression() {
      const $malloc = $M.malloc, $U1 = $M.U1, $U4 = $M.U4;
      var expr = 0;
      expr = parseLogicalANDExpression();
      while (match('||')) {
        lex();
        var logical = $malloc(12) >> 2;
        $U1[logical << 2] = convertOperator('||');
        $U4[logical + 1] = expr;
        $U4[logical + 2] = parseLogicalANDExpression();
        expr = $malloc(8) >> 2;
        $U1[expr << 2] = $U1[Syntax + 21];
        $U4[expr + 1] = logical;
      }
      return expr;
    }
    // 11.12 Conditional Operator
    function parseConditionalExpression() {
      const $malloc = $M.malloc, $U4 = $M.U4, $U1 = $M.U1;
      var previousAllowIn;
      var expr = 0, consequent = 0;
      expr = parseLogicalORExpression();
      if (match('?')) {
        lex();
        previousAllowIn = state.allowIn;
        state.allowIn = true;
        consequent = parseAssignmentExpression();
        state.allowIn = previousAllowIn;
        expect(':');
        var conditional = $malloc(12) >> 2;
        $U4[conditional] = expr;
        $U4[conditional + 2] = consequent;
        $U4[conditional + 1] = parseAssignmentExpression();
        expr = $malloc(8) >> 2;
        $U1[expr << 2] = $U1[Syntax + 7];
        $U4[expr + 1] = conditional;
      }
      return expr;
    }
    // 11.13 Assignment Operators
    function parseAssignmentExpression() {
      const $malloc = $M.malloc, $U1 = $M.U1, $U4 = $M.U4;
      var expr = 0;
      expr = parseConditionalExpression();
      if (matchAssign()) {
        // LeftHandSideExpression
        if (!isLeftHandSide(expr)) {
          throwError({}, Messages.InvalidLHSInAssignment);
        }
        // 11.13.1
        if (strict && $U1[expr << 2] === $U1[Syntax + 17] && isRestrictedWord($U4[$U4[expr + 1]])) {
          throwError({}, Messages.StrictLHSAssignment);
        }
        var assignment = $malloc(12) >> 2;
        $U1[assignment << 2] = convertOperator(lex().value);
        $U4[assignment + 1] = expr;
        $U4[assignment + 2] = parseAssignmentExpression();
        expr = castExpression(assignment, $U1[Syntax]);
      }
      return expr;
    }
    // 11.14 Comma Operator
    function parseExpression() {
      const $malloc = $M.malloc, $U4 = $M.U4, $U1 = $M.U1;
      var expr = 0;
      expr = parseAssignmentExpression();
      if (match(',')) {
        var sequence = $malloc(4) >> 2;
        $U4[sequence] = $malloc(8) >> 2;
        var cur = $U4[sequence];
        $U4[cur] = expr;
        while (index < length) {
          if (!match(',')) {
            break;
          }
          lex();
          $U4[cur + 1] = $malloc(8) >> 2;
          cur = $U4[cur + 1];
          $U4[cur] = castExpression(parseAssignmentExpression(), $U1[Syntax]);
        }
        expr = $malloc(8) >> 2;
        $U1[expr << 2] = $U1[Syntax + 28];
        $U4[expr + 1] = sequence;
      }
      return expr;
    }
    // 12.1 Block
    function parseStatementList() {
      const $malloc = $M.malloc, $U4 = $M.U4;
      var list = $malloc(8) >> 2;
      var cur = list;
      var statement = 0;
      while (index < length) {
        if (match('}')) {
          break;
        }
        statement = parseSourceElement();
        if (statement === 0) {
          break;
        }
        $U4[cur] = statement;
        $U4[cur + 1] = $malloc(8) >> 2;
        cur = $U4[cur + 1];
      }
      return list;
    }
    function parseBlock() {
      const $malloc = $M.malloc, $U4 = $M.U4;
      var block = 0;
      expect('{');
      block = parseStatementList();
      expect('}');
      var blockSt = $malloc(4) >> 2;
      $U4[blockSt] = block;
      return blockSt;
    }
    // 12.2 Variable Statement
    function parseVariableIdentifier() {
      const $malloc = $M.malloc, $U4 = $M.U4;
      var token = lex();
      if (token.type !== Token.Identifier) {
        throwUnexpected(token);
      }
      var ident = $malloc(4) >> 2;
      $U4[ident] = convertStr(token.value);
      return ident;
    }
    function parseVariableDeclaration(kind) {
      const $malloc = $M.malloc, $U4 = $M.U4, $U1 = $M.U1;
      var init = 0;
      var id = 0;
      id = parseVariableIdentifier();
      // 12.2.1
      if (strict && isRestrictedWord($U4[id])) {
        throwErrorTolerant({}, Messages.StrictVarName);
      }
      if (kind === 'const') {
        expect('=');
        init = castPattern(parseAssignmentExpression(), $U1[Syntax + 40]);
      } else if (match('=')) {
        lex();
        init = castPattern(parseAssignmentExpression(), $U1[Syntax + 40]);
      }
      var decl = $malloc(8) >> 2;
      $U4[decl] = castPattern(id, $U1[Syntax + 17]);
      $U4[decl + 1] = castExpression(init, $U1[Syntax + 17]);
      return decl;
    }
    function parseVariableDeclarationList(kind) {
      const $malloc = $M.malloc, $U4 = $M.U4;
      var list = $malloc(8) >> 2;
      var cur = list;
      while (index < length) {
        $U4[cur] = parseVariableDeclaration(kind);
        $U4[cur + 1] = $malloc(8) >> 2;
        cur = $U4[cur + 1];
        if (!match(',')) {
          break;
        }
        lex();
      }
      return list;
    }
    function parseVariableStatement() {
      const $malloc = $M.malloc, $U4 = $M.U4, $U1 = $M.U1;
      var declarations = 0;
      expectKeyword('var');
      declarations = parseVariableDeclarationList(VAR_KIND_VAR);
      consumeSemicolon();
      var decl = $malloc(8) >> 2;
      $U4[decl] = declarations;
      $U1[(decl << 2) + 4] = VAR_KIND_VAR;
      return decl;
    }
    // kind may be `const` or `let`
    // Both are experimental and not in the specification yet.
    // see http://wiki.ecmascript.org/doku.php?id=harmony:const
    // and http://wiki.ecmascript.org/doku.php?id=harmony:let
    function parseConstLetDeclaration(kind) {
      const $malloc = $M.malloc, $U4 = $M.U4, $U1 = $M.U1;
      var declarations = 0;
      switch (kind) {
      case VAR_KIND_VAR:
        expectKeyword('var');
        break;
      case VAR_KIND_LET:
        expectKeyword('var');
        break;
      case VAR_KIND_CONST:
        expectKeyword('var');
        break;
      }
      declarations = parseVariableDeclarationList(kind);
      consumeSemicolon();
      var decl = $malloc(8) >> 2;
      $U4[decl] = declarations;
      $U1[(decl << 2) + 4] = kind;
      return decl;
    }
    // 12.3 Empty Statement
    function parseEmptyStatement() {
      const $malloc = $M.malloc, $U1 = $M.U1;
      expect(';');
      var s = $malloc(8) >> 2;
      $U1[s << 2] = $U1[Syntax + 11];
      return s;
    }
    // 12.4 Expression Statement
    function parseExpressionStatement() {
      const $malloc = $M.malloc, $U1 = $M.U1, $U4 = $M.U4;
      var expr = 0;
      expr = parseExpression();
      consumeSemicolon();
      var s = $malloc(8) >> 2;
      $U1[s << 2] = $U1[Syntax + 12];
      $U4[s + 1] = expr;
      return s;
    }
    // 12.5 If statement
    function parseIfStatement() {
      const $malloc = $M.malloc, $U4 = $M.U4;
      var test = 0;
      var consequent = 0, alternate = 0;
      expectKeyword('if');
      expect('(');
      test = parseExpression();
      expect(')');
      consequent = parseStatement();
      if (matchKeyword('else')) {
        lex();
        alternate = parseStatement();
      } else {
        alternate = 0;
      }
      var st = $malloc(12) >> 2;
      $U4[st] = test;
      $U4[st + 1] = consequent;
      $U4[st + 2] = alternate;
      return st;
    }
    // 12.6 Iteration Statements
    function parseDoWhileStatement() {
      const $malloc = $M.malloc, $U4 = $M.U4;
      var oldInIteration;
      var body = 0;
      var test = 0;
      expectKeyword('do');
      oldInIteration = state.inIteration;
      state.inIteration = true;
      body = parseStatement();
      state.inIteration = oldInIteration;
      expectKeyword('while');
      expect('(');
      test = parseExpression();
      expect(')');
      if (match(';')) {
        lex();
      }
      var st = $malloc(8) >> 2;
      $U4[st] = body;
      $U4[st + 1] = test;
      return st;
    }
    function parseWhileStatement() {
      const $malloc = $M.malloc, $U4 = $M.U4;
      var oldInIteration;
      var test = 0;
      var body = 0;
      expectKeyword('while');
      expect('(');
      test = parseExpression();
      expect(')');
      oldInIteration = state.inIteration;
      state.inIteration = true;
      body = parseStatement();
      state.inIteration = oldInIteration;
      var st = $malloc(8) >> 2;
      $U4[st] = test;
      $U4[st + 1] = body;
      return st;
    }
    function parseForVariableDeclaration() {
      const $malloc = $M.malloc, $U4 = $M.U4, $U1 = $M.U1;
      var token = lex();
      var decl = $malloc(8) >> 2;
      $U4[decl] = parseVariableDeclarationList(VAR_KIND_VAR);
      // TODO - check kind
      $U1[(decl << 2) + 4] = convertVarKind(token.value);
      return decl;
    }
    function parseForStatement() {
      const $malloc = $M.malloc, $U1 = $M.U1, $U4 = $M.U4;
      var oldInIteration;
      var init = 0, left = 0;
      var test = 0, update = 0, right = 0;
      var body = 0;
      var initType = 0;
      expectKeyword('for');
      expect('(');
      if (match(';')) {
        lex();
      } else {
        if (matchKeyword('var') || matchKeyword('let')) {
          state.allowIn = false;
          initType = $U1[Syntax + 36];
          init = $malloc(4) >> 2;
          $U4[init] = parseForVariableDeclaration();
          state.allowIn = true;
          if (varDeclListLength($U4[$U4[init]]) === 1 && matchKeyword('in')) {
            lex();
            left = init;
            right = parseExpression();
            $U4[init] = 0;
          }
        } else {
          state.allowIn = false;
          initType = $U1[Syntax + 40];
          init = $malloc(4) >> 2;
          $U4[init] = parseExpression();
          state.allowIn = true;
          if (matchKeyword('in')) {
            // LeftHandSideExpression
            if (!isLeftHandSide($U4[init])) {
              throwError({}, Messages.InvalidLHSInForIn);
            }
            lex();
            left = init;
            right = parseExpression();
            $U4[init] = 0;
          }
        }
        if (left === 0) {
          expect(';');
        }
      }
      if (left === 0) {
        if (!match(';')) {
          test = parseExpression();
        }
        expect(';');
        if (!match(')')) {
          update = parseExpression();
        }
      }
      expect(')');
      oldInIteration = state.inIteration;
      state.inIteration = true;
      body = parseStatement();
      state.inIteration = oldInIteration;
      if (left === 0) {
        var st = $malloc(20) >> 2;
        $U4[st + 1] = init;
        $U4[st + 2] = test;
        $U4[st + 3] = update;
        $U4[st + 4] = body;
        return castStatement(st, $U1[Syntax + 13]);
      }
      var st$1 = $malloc(20) >> 2;
      $U4[st$1 + 1] = left;
      $U4[st$1 + 2] = right;
      $U4[st$1 + 3] = body;
      $U1[(st$1 << 2) + 16] = 0;
      return castStatement(st$1, $U1[Syntax + 14]);
    }
    // 12.7 The continue statement
    function parseContinueStatement() {
      const $malloc = $M.malloc, $U4 = $M.U4;
      var token;
      var label = 0;
      var st = 0;
      expectKeyword('continue');
      // Optimize the most common form: 'continue;'.
      if (source[index] === ';') {
        lex();
        if (!state.inIteration) {
          throwError({}, Messages.IllegalContinue);
        }
        return $malloc(4) >> 2;
      }
      if (peekLineTerminator()) {
        if (!state.inIteration) {
          throwError({}, Messages.IllegalContinue);
        }
        return $malloc(4) >> 2;
      }
      token = lookahead();
      if (token.type === Token.Identifier) {
        label = parseVariableIdentifier();
        if (!Object.prototype.hasOwnProperty.call(state.labelSet, readStr($U4[label]))) {
          throwError({}, Messages.UnknownLabel, readStr($U4[label]));
        }
      }
      consumeSemicolon();
      if (label === 0 && !state.inIteration) {
        throwError({}, Messages.IllegalContinue);
      }
      st = $malloc(4) >> 2;
      $U4[st] = label;
      return st;
    }
    // 12.8 The break statement
    function parseBreakStatement() {
      const $malloc = $M.malloc, $U4 = $M.U4;
      var token;
      var st = $malloc(4) >> 2;
      var label = 0;
      expectKeyword('break');
      // Optimize the most common form: 'break;'.
      if (source[index] === ';') {
        lex();
        if (!(state.inIteration || state.inSwitch)) {
          throwError({}, Messages.IllegalBreak);
        }
        return st;
      }
      if (peekLineTerminator()) {
        if (!(state.inIteration || state.inSwitch)) {
          throwError({}, Messages.IllegalBreak);
        }
        return st;
      }
      token = lookahead();
      if (token.type === Token.Identifier) {
        label = parseVariableIdentifier();
        if (!Object.prototype.hasOwnProperty.call(state.labelSet, readStr($U4[label]))) {
          throwError({}, Messages.UnknownLabel, readStr($U4[label]));
        }
      }
      consumeSemicolon();
      if (label === 0 && !(state.inIteration || state.inSwitch)) {
        throwError({}, Messages.IllegalBreak);
      }
      $U4[st] = label;
      return st;
    }
    // 12.9 The return statement
    function parseReturnStatement() {
      const $malloc = $M.malloc, $U4 = $M.U4;
      var token;
      var st = 0;
      var argument = 0;
      expectKeyword('return');
      if (!state.inFunctionBody) {
        throwErrorTolerant({}, Messages.IllegalReturn);
      }
      // 'return' followed by a space and an identifier is very common.
      if (source[index] === ' ') {
        if (isIdentifierStart(source[index + 1])) {
          argument = parseExpression();
          consumeSemicolon();
          st = $malloc(4) >> 2;
          $U4[st] = argument;
          return st;
        }
      }
      if (peekLineTerminator()) {
        st = $malloc(4) >> 2;
        return st;
      }
      if (!match(';')) {
        token = lookahead();
        if (!match('}') && token.type !== Token.EOF) {
          argument = parseExpression();
        }
      }
      consumeSemicolon();
      st = $malloc(4) >> 2;
      $U4[st] = argument;
      return st;
    }
    // 12.10 The with statement
    function parseWithStatement() {
      const $malloc = $M.malloc, $U4 = $M.U4;
      var object = 0;
      var body = 0;
      if (strict) {
        throwErrorTolerant({}, Messages.StrictModeWith);
      }
      expectKeyword('with');
      expect('(');
      object = parseExpression();
      expect(')');
      body = parseStatement();
      var st = $malloc(8) >> 2;
      $U4[st] = object;
      $U4[st + 1] = body;
      return st;
    }
    // 12.10 The swith statement
    function parseSwitchCase() {
      const $malloc = $M.malloc, $U4 = $M.U4;
      var test = 0;
      var consequent = $malloc(8) >> 2;
      var cur = consequent;
      var statement = 0;
      var clause, defaultFound;
      if (matchKeyword('default')) {
        lex();
        test = 0;
      } else {
        expectKeyword('case');
        test = parseExpression();
      }
      expect(':');
      while (index < length) {
        if (match('}') || matchKeyword('default') || matchKeyword('case')) {
          break;
        }
        statement = parseStatement();
        if (statement === 0) {
          break;
        }
        $U4[cur] = statement;
        $U4[cur + 1] = $malloc(8) >> 2;
        cur = $U4[cur + 1];
      }
      var s = $malloc(8) >> 2;
      $U4[s] = test;
      $U4[s + 1] = consequent;
      return s;
    }
    function parseSwitchStatement() {
      const $malloc = $M.malloc, $U4 = $M.U4;
      var oldInSwitch;
      var st = 0;
      var discriminant = 0;
      var cases = 0;
      var defaultFound;
      var clause = 0;
      expectKeyword('switch');
      expect('(');
      discriminant = parseExpression();
      expect(')');
      expect('{');
      if (match('}')) {
        lex();
        st = $malloc(12) >> 2;
        $U4[st] = discriminant;
        return st;
      }
      cases = $malloc(8) >> 2;
      var cur = cases;
      oldInSwitch = state.inSwitch;
      state.inSwitch = true;
      defaultFound = false;
      while (index < length) {
        if (match('}')) {
          break;
        }
        clause = parseSwitchCase();
        if ($U4[clause] === 0) {
          if (defaultFound) {
            throwError({}, Messages.MultipleDefaultsInSwitch);
          }
          defaultFound = true;
        }
        $U4[cur] = clause;
        $U4[cur + 1] = $malloc(8) >> 2;
        cur = $U4[cur + 1];
      }
      state.inSwitch = oldInSwitch;
      expect('}');
      st = $malloc(12) >> 2;
      $U4[st] = discriminant;
      $U4[st + 1] = cases;
      return st;
    }
    // 12.13 The throw statement
    function parseThrowStatement() {
      const $malloc = $M.malloc, $U4 = $M.U4;
      var argument = 0;
      expectKeyword('throw');
      if (peekLineTerminator()) {
        throwError({}, Messages.NewlineAfterThrow);
      }
      argument = parseExpression();
      consumeSemicolon();
      var st = $malloc(4) >> 2;
      $U4[st] = argument;
      return st;
    }
    // 12.14 The try statement
    function parseCatchClause() {
      const $malloc = $M.malloc, $U1 = $M.U1, $U4 = $M.U4;
      var param = 0;
      expectKeyword('catch');
      expect('(');
      if (!match(')')) {
        param = castPattern(parseExpression(), $U1[Syntax + 40]);
        // 12.14.1
        if (strict && $U1[param << 2] === $U1[Syntax + 17] && isRestrictedWord(readStr($U4[$U4[param + 1]]))) {
          throwErrorTolerant({}, Messages.StrictCatchVariable);
        }
      }
      expect(')');
      var clause = $malloc(12) >> 2;
      $U4[clause] = param;
      $U4[clause + 2] = parseBlock();
      return clause;
    }
    function parseTryStatement() {
      const $malloc = $M.malloc, $U4 = $M.U4;
      var block = 0;
      var handlers = $malloc(8) >> 2;
      var finalizer = 0;
      expectKeyword('try');
      block = parseBlock();
      var cur = handlers;
      if (matchKeyword('catch')) {
        $U4[cur] = parseCatchClause();
        $U4[cur + 1] = $malloc(8) >> 2;
        cur = $U4[cur + 1];
      }
      if (matchKeyword('finally')) {
        lex();
        finalizer = parseBlock();
      }
      if (catchClauseListLength(handlers) === 0 && !finalizer) {
        throwError({}, Messages.NoCatchOrFinally);
      }
      var st = $malloc(12) >> 2;
      $U4[st] = block;
      $U4[st + 1] = handlers;
      $U4[st + 2] = finalizer;
      return st;
    }
    // 12.15 The debugger statement
    function parseDebuggerStatement() {
      const $malloc = $M.malloc;
      expectKeyword('debugger');
      consumeSemicolon();
      return $malloc(8) >> 2;
    }
    // 12 Statements
    function parseStatement() {
      const $malloc = $M.malloc, $U1 = $M.U1, $U4 = $M.U4;
      var token = lookahead();
      var labeledBody = 0;
      var expr = 0;
      if (token.type === Token.EOF) {
        throwUnexpected(token);
      }
      if (token.type === Token.Punctuator) {
        switch (token.value) {
        case ';':
          return parseEmptyStatement();
        case '{':
          return castStatement(parseBlock(), $U1[Syntax + 2]);
        case '(':
          return castStatement(parseExpressionStatement(), $U1[Syntax + 12]);
        default:
          break;
        }
      }
      if (token.type === Token.Keyword) {
        switch (token.value) {
        case 'break':
          return castStatement(parseBreakStatement(), $U1[Syntax + 4]);
        case 'continue':
          return castStatement(parseContinueStatement(), $U1[Syntax + 8]);
        case 'debugger':
          return parseDebuggerStatement();
        case 'do':
          return castStatement(parseDoWhileStatement(), $U1[Syntax + 9]);
        case 'for':
          return parseForStatement();
        case 'function':
          return castStatement(parseFunctionDeclaration(), $U1[Syntax + 15]);
        case 'if':
          return castStatement(parseIfStatement(), $U1[Syntax + 18]);
        case 'return':
          return castStatement(parseReturnStatement(), $U1[Syntax + 27]);
        case 'switch':
          return castStatement(parseSwitchStatement(), $U1[Syntax + 29]);
        case 'throw':
          return castStatement(parseThrowStatement(), $U1[Syntax + 32]);
        case 'try':
          return castStatement(parseTryStatement(), $U1[Syntax + 33]);
        case 'var':
          return castStatement(parseVariableStatement(), $U1[Syntax + 36]);
        case 'while':
          return castStatement(parseWhileStatement(), $U1[Syntax + 38]);
        case 'with':
          return castStatement(parseWithStatement(), $U1[Syntax + 39]);
        default:
          break;
        }
      }
      expr = parseExpression();
      // 12.12 Labelled Statements
      if ($U1[expr << 2] === $U1[Syntax + 17] && match(':')) {
        lex();
        var name = readStr($U4[$U4[expr + 1]]);
        if (Object.prototype.hasOwnProperty.call(state.labelSet, name)) {
          throwError({}, Messages.Redeclaration, 'Label', name);
        }
        state.labelSet[name] = true;
        labeledBody = parseStatement();
        delete state.labelSet[name];
        var st = $malloc(8) >> 2;
        $U4[st] = $U4[expr + 1];
        $U4[st + 1] = labeledBody;
        return castStatement(st, $U1[Syntax + 20]);
      }
      consumeSemicolon();
      var st$1 = $malloc(8) >> 2;
      $U4[st$1 + 1] = expr;
      return castStatement(st$1, $U1[Syntax + 12]);
    }
    // 13 Function Definition
    function parseFunctionSourceElements() {
      const $malloc = $M.malloc, $U4 = $M.U4, $U1 = $M.U1;
      var token, directive, firstRestricted, oldLabelSet, oldInIteration, oldInSwitch, oldInFunctionBody;
      var sourceElement = 0;
      var sourceElements = $malloc(8) >> 2;
      var cur = sourceElements;
      expect('{');
      while (index < length) {
        token = lookahead();
        if (token.type !== Token.StringLiteral) {
          break;
        }
        $U4[cur] = parseSourceElement();
        if ($U1[$U4[cur] << 2] === $U1[Syntax + 12] && $U1[$U4[$U4[cur] + 1] << 2] !== $U1[Syntax + 19]) {
          // this is not directive
          break;
        }
        $U4[cur + 1] = $malloc(8) >> 2;
        cur = $U4[cur + 1];
        directive = sliceSource(token.range[0] + 1, token.range[1] - 1);
        if (directive === 'use strict') {
          strict = true;
          if (firstRestricted) {
            throwError(firstRestricted, Messages.StrictOctalLiteral);
          }
        } else {
          if (!firstRestricted && token.octal) {
            firstRestricted = token;
          }
        }
      }
      oldLabelSet = state.labelSet;
      oldInIteration = state.inIteration;
      oldInSwitch = state.inSwitch;
      oldInFunctionBody = state.inFunctionBody;
      state.labelSet = {};
      state.inIteration = false;
      state.inSwitch = false;
      state.inFunctionBody = true;
      while (index < length) {
        if (match('}')) {
          break;
        }
        sourceElement = parseSourceElement();
        if (sourceElement === 0) {
          break;
        }
        $U4[cur] = sourceElement;
        $U4[cur + 1] = $malloc(8) >> 2;
        cur = $U4[cur + 1];
      }
      expect('}');
      state.labelSet = oldLabelSet;
      state.inIteration = oldInIteration;
      state.inSwitch = oldInSwitch;
      state.inFunctionBody = oldInFunctionBody;
      var block = $malloc(4) >> 2;
      $U4[block] = sourceElements;
      return block;
    }
    function parseFunctionDeclaration() {
      const $malloc = $M.malloc, $U4 = $M.U4, $U1 = $M.U1;
      var token, firstRestricted, message, previousStrict, paramSet;
      var id = 0;
      var params = $malloc(8) >> 2;
      var cur = params;
      var param = 0;
      var body = 0;
      expectKeyword('function');
      token = lookahead();
      id = parseVariableIdentifier();
      if (strict) {
        if (isRestrictedWord(token.value)) {
          throwError(token, Messages.StrictFunctionName);
        }
      } else {
        if (isRestrictedWord(token.value)) {
          firstRestricted = token;
          message = Messages.StrictFunctionName;
        } else if (isStrictModeReservedWord(token.value)) {
          firstRestricted = token;
          message = Messages.StrictReservedWord;
        }
      }
      expect('(');
      if (!match(')')) {
        paramSet = {};
        while (index < length) {
          token = lookahead();
          param = parseVariableIdentifier();
          if (strict) {
            if (isRestrictedWord(token.value)) {
              throwError(token, Messages.StrictParamName);
            }
            if (Object.prototype.hasOwnProperty.call(paramSet, token.value)) {
              throwError(token, Messages.StrictParamDupe);
            }
          } else if (!firstRestricted) {
            if (isRestrictedWord(token.value)) {
              firstRestricted = token;
              message = Messages.StrictParamName;
            } else if (isStrictModeReservedWord(token.value)) {
              firstRestricted = token;
              message = Messages.StrictReservedWord;
            } else if (Object.prototype.hasOwnProperty.call(paramSet, token.value)) {
              firstRestricted = token;
              message = Messages.StrictParamDupe;
            }
          }
          $U4[cur] = castPattern(param, $U1[Syntax + 17]);
          $U4[cur + 1] = $malloc(8) >> 2;
          cur = $U4[cur + 1];
          paramSet[readStr($U4[param])] = true;
          if (match(')')) {
            break;
          }
          expect(',');
        }
      }
      expect(')');
      previousStrict = strict;
      body = parseFunctionSourceElements();
      if (strict && firstRestricted) {
        throwError(firstRestricted, message);
      }
      strict = previousStrict;
      var decl = $malloc(32) >> 2;
      $U4[decl] = id;
      $U4[decl + 1] = params;
      $U4[decl + 4] = $malloc(8) >> 2;
      $U1[(decl << 2) + 8] = $U1[Syntax + 2];
      $U4[decl + 3] = body;
      $U4[decl + 5] = 0;
      $U1[(decl << 2) + 24] = 0;
      $U1[(decl << 2) + 25] = 0;
      return decl;
    }
    function parseFunctionExpression() {
      const $malloc = $M.malloc, $U4 = $M.U4, $U1 = $M.U1;
      var token, firstRestricted, message, previousStrict, paramSet;
      var id = 0;
      var params = $malloc(8) >> 2;
      var cur = params;
      var param = 0;
      var body = 0;
      expectKeyword('function');
      if (!match('(')) {
        token = lookahead();
        id = parseVariableIdentifier();
        if (strict) {
          if (isRestrictedWord(token.value)) {
            throwError(token, Messages.StrictFunctionName);
          }
        } else {
          if (isRestrictedWord(token.value)) {
            firstRestricted = token;
            message = Messages.StrictFunctionName;
          } else if (isStrictModeReservedWord(token.value)) {
            firstRestricted = token;
            message = Messages.StrictReservedWord;
          }
        }
      }
      expect('(');
      if (!match(')')) {
        paramSet = {};
        while (index < length) {
          token = lookahead();
          param = parseVariableIdentifier();
          if (strict) {
            if (isRestrictedWord(token.value)) {
              throwError(token, Messages.StrictParamName);
            }
            if (Object.prototype.hasOwnProperty.call(paramSet, token.value)) {
              throwError(token, Messages.StrictParamDupe);
            }
          } else if (!firstRestricted) {
            if (isRestrictedWord(token.value)) {
              firstRestricted = token;
              message = Messages.StrictParamName;
            } else if (isStrictModeReservedWord(token.value)) {
              firstRestricted = token;
              message = Messages.StrictReservedWord;
            } else if (Object.prototype.hasOwnProperty.call(paramSet, token.value)) {
              firstRestricted = token;
              message = Messages.StrictParamDupe;
            }
          }
          $U4[cur] = castPattern(param, $U1[Syntax + 17]);
          $U4[cur + 1] = $malloc(8) >> 2;
          cur = $U4[cur + 1];
          paramSet[readStr($U4[param])] = true;
          if (match(')')) {
            break;
          }
          expect(',');
        }
      }
      expect(')');
      previousStrict = strict;
      body = parseFunctionSourceElements();
      if (strict && firstRestricted) {
        throwError(firstRestricted, message);
      }
      strict = previousStrict;
      var expr = $malloc(32) >> 2;
      $U4[expr] = id;
      $U4[expr + 1] = params;
      $U4[expr + 4] = $malloc(8) >> 2;
      $U1[(expr << 2) + 8] = $U1[Syntax + 2];
      $U4[expr + 3] = body;
      $U4[expr + 5] = 0;
      $U1[(expr << 2) + 24] = 0;
      $U1[(expr << 2) + 25] = 0;
      return expr;
    }
    // 14 Program
    function parseSourceElement() {
      const $U1 = $M.U1;
      var token = lookahead();
      if (token.type === Token.Keyword) {
        switch (token.value) {
        case 'const':
        case 'let':
          return castStatement(parseConstLetDeclaration(convertVarKind(token.value)), $U1[Syntax + 36]);
        case 'function':
          return castStatement(parseFunctionDeclaration(), $U1[Syntax + 15]);
        default:
          return parseStatement();
        }
      }
      if (token.type !== Token.EOF) {
        return parseStatement();
      }
      return 0;
    }
    function parseSourceElements() {
      const $malloc = $M.malloc, $U4 = $M.U4, $U1 = $M.U1;
      var token, directive, firstRestricted;
      var sourceElement = 0;
      var sourceElements = $malloc(8) >> 2;
      var cur = sourceElements;
      while (index < length) {
        token = lookahead();
        if (token.type !== Token.StringLiteral) {
          break;
        }
        sourceElement = parseSourceElement();
        $U4[cur] = sourceElement;
        $U4[cur + 1] = $malloc(8) >> 2;
        cur = $U4[cur + 1];
        if ($U1[sourceElement << 2] !== $U1[Syntax + 12] && $U1[$U4[sourceElement + 1] << 2] !== $U1[Syntax + 19]) {
          // this is not directive
          break;
        }
        directive = sliceSource(token.range[0] + 1, token.range[1] - 1);
        if (directive === 'use strict') {
          strict = true;
          if (firstRestricted) {
            throwError(firstRestricted, Messages.StrictOctalLiteral);
          }
        } else {
          if (!firstRestricted && token.octal) {
            firstRestricted = token;
          }
        }
      }
      while (index < length) {
        sourceElement = parseSourceElement();
        if (sourceElement === 0) {
          break;
        }
        $U4[cur] = sourceElement;
        $U4[cur + 1] = $malloc(8) >> 2;
        cur = $U4[cur + 1];
      }
      return sourceElements;
    }
    function parseProgram() {
      const $malloc = $M.malloc, $U1 = $M.U1, $U4 = $M.U4;
      var program = $malloc(8) >> 2;
      strict = false;
      $U1[program << 2] = $U1[Syntax + 25];
      $U4[program + 1] = parseSourceElements();
      return program;
    }
    // The following functions are needed only when the option to preserve
    // the comments is active.
    function addComment(type, value, start, end, loc) {
      assert(typeof start === 'number', 'Comment must have valid position');
      // Because the way the actual token is scanned, often the comments
      // (if any) are skipped twice during the lexical analysis.
      // Thus, we need to skip adding a comment if the comment array already
      // handled it.
      if (extra.comments.length > 0) {
        if (extra.comments[extra.comments.length - 1].range[1] > start) {
          return;
        }
      }
      extra.comments.push({
        type: type,
        value: value,
        range: [
          start,
          end
        ],
        loc: loc
      });
    }
    function scanComment() {
      var comment, ch, loc, start, blockComment, lineComment;
      comment = '';
      blockComment = false;
      lineComment = false;
      while (index < length) {
        ch = source[index];
        if (lineComment) {
          ch = nextChar();
          if (isLineTerminator(ch)) {
            loc.end = {
              line: lineNumber,
              column: index - lineStart - 1
            };
            lineComment = false;
            addComment('Line', comment, start, index - 1, loc);
            if (ch === '\r' && source[index] === '\n') {
              ++index;
            }
            ++lineNumber;
            lineStart = index;
            comment = '';
          } else if (index >= length) {
            lineComment = false;
            comment += ch;
            loc.end = {
              line: lineNumber,
              column: length - lineStart
            };
            addComment('Line', comment, start, length, loc);
          } else {
            comment += ch;
          }
        } else if (blockComment) {
          if (isLineTerminator(ch)) {
            if (ch === '\r' && source[index + 1] === '\n') {
              ++index;
              comment += '\r\n';
            } else {
              comment += ch;
            }
            ++lineNumber;
            ++index;
            lineStart = index;
            if (index >= length) {
              throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
          } else {
            ch = nextChar();
            if (index >= length) {
              throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
            comment += ch;
            if (ch === '*') {
              ch = source[index];
              if (ch === '/') {
                comment = comment.substr(0, comment.length - 1);
                blockComment = false;
                ++index;
                loc.end = {
                  line: lineNumber,
                  column: index - lineStart
                };
                addComment('Block', comment, start, index, loc);
                comment = '';
              }
            }
          }
        } else if (ch === '/') {
          ch = source[index + 1];
          if (ch === '/') {
            loc = {
              start: {
                line: lineNumber,
                column: index - lineStart
              }
            };
            start = index;
            index += 2;
            lineComment = true;
            if (index >= length) {
              loc.end = {
                line: lineNumber,
                column: index - lineStart
              };
              lineComment = false;
              addComment('Line', comment, start, index, loc);
            }
          } else if (ch === '*') {
            start = index;
            index += 2;
            blockComment = true;
            loc = {
              start: {
                line: lineNumber,
                column: index - lineStart - 2
              }
            };
            if (index >= length) {
              throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
          } else {
            break;
          }
        } else if (isWhiteSpace(ch)) {
          ++index;
        } else if (isLineTerminator(ch)) {
          ++index;
          if (ch === '\r' && source[index] === '\n') {
            ++index;
          }
          ++lineNumber;
          lineStart = index;
        } else {
          break;
        }
      }
    }
    function filterCommentLocation() {
      var i, entry, comment, comments = [];
      for (i = 0; i < extra.comments.length; ++i) {
        entry = extra.comments[i];
        comment = {
          type: entry.type,
          value: entry.value
        };
        if (extra.range) {
          comment.range = entry.range;
        }
        if (extra.loc) {
          comment.loc = entry.loc;
        }
        comments.push(comment);
      }
      extra.comments = comments;
    }
    function collectToken() {
      var start, loc, token, range, value;
      skipComment();
      start = index;
      loc = {
        start: {
          line: lineNumber,
          column: index - lineStart
        }
      };
      token = extra.advance();
      loc.end = {
        line: lineNumber,
        column: index - lineStart
      };
      if (token.type !== Token.EOF) {
        range = [
          token.range[0],
          token.range[1]
        ];
        value = sliceSource(token.range[0], token.range[1]);
        extra.tokens.push({
          type: TokenName[token.type],
          value: value,
          range: range,
          loc: loc
        });
      }
      return token;
    }
    function collectRegex() {
      var pos, loc, regex, token;
      skipComment();
      pos = index;
      loc = {
        start: {
          line: lineNumber,
          column: index - lineStart
        }
      };
      regex = extra.scanRegExp();
      loc.end = {
        line: lineNumber,
        column: index - lineStart
      };
      // Pop the previous token, which is likely '/' or '/='
      if (extra.tokens.length > 0) {
        token = extra.tokens[extra.tokens.length - 1];
        if (token.range[0] === pos && token.type === 'Punctuator') {
          if (token.value === '/' || token.value === '/=') {
            extra.tokens.pop();
          }
        }
      }
      extra.tokens.push({
        type: 'RegularExpression',
        value: regex.literal,
        range: [
          pos,
          index
        ],
        loc: loc
      });
      return regex;
    }
    function filterTokenLocation() {
      var i, entry, token, tokens = [];
      for (i = 0; i < extra.tokens.length; ++i) {
        entry = extra.tokens[i];
        token = {
          type: entry.type,
          value: entry.value
        };
        if (extra.range) {
          token.range = entry.range;
        }
        if (extra.loc) {
          token.loc = entry.loc;
        }
        tokens.push(token);
      }
      extra.tokens = tokens;
    }
    function createLiteral(token) {
      const $malloc = $M.malloc, $U4 = $M.U4;
      var literal = $malloc(12) >> 2;
      $U4[literal + 1] = convertStr(token.value);
      return literal;
    }
    function createRawLiteral(token) {
      const $malloc = $M.malloc, $U4 = $M.U4;
      var literal = $malloc(12) >> 2;
      $U4[literal + 1] = convertStr(token.value);
      $U4[literal + 2] = convertStr(sliceSource(token.range[0], token.range[1]));
      return literal;
    }
    function wrapTrackingFunction(range, loc) {
      return function inner(parseFunction) {
        function isBinary(node) {
          const $U1 = $M.U1;
          return node.type === $U1[Syntax + 21] || node.type === $U1[Syntax + 3];
        }
        function visit(node) {
          if (isBinary(node.left)) {
            visit(node.left);
          }
          if (isBinary(node.right)) {
            visit(node.right);
          }
          if (range && typeof node.range === 'undefined') {
            node.range = [
              node.left.range[0],
              node.right.range[1]
            ];
          }
          if (loc && typeof node.loc === 'undefined') {
            node.loc = {
              start: node.left.loc.start,
              end: node.right.loc.end
            };
          }
        }
        return function () {
          const $U1 = $M.U1;
          var node, rangeInfo, locInfo;
          skipComment();
          rangeInfo = [
            index,
            0
          ];
          locInfo = {
            start: {
              line: lineNumber,
              column: index - lineStart
            }
          };
          node = parseFunction.apply(null, arguments);
          if (typeof node !== 'undefined') {
            if (range) {
              rangeInfo[1] = index;
              node.range = rangeInfo;
            }
            if (loc) {
              locInfo.end = {
                line: lineNumber,
                column: index - lineStart
              };
              node.loc = locInfo;
            }
            if (isBinary(node)) {
              visit(node);
            }
            if (node.type === $U1[Syntax + 22]) {
              if (typeof node.object.range !== 'undefined') {
                node.range[0] = node.object.range[0];
              }
              if (typeof node.object.loc !== 'undefined') {
                node.loc.start = node.object.loc.start;
              }
            }
            if (node.type === $U1[Syntax + 5]) {
              if (typeof node.callee.range !== 'undefined') {
                node.range[0] = node.callee.range[0];
              }
              if (typeof node.callee.loc !== 'undefined') {
                node.loc.start = node.callee.loc.start;
              }
            }
            return node;
          }
        };
      };
    }
    function patch() {
      var wrapTracking;
      if (extra.comments) {
        extra.skipComment = skipComment;
        skipComment = scanComment;
      }
      if (extra.raw) {
        extra.createLiteral = createLiteral;
        createLiteral = createRawLiteral;
      }
      if (extra.range || extra.loc) {
        wrapTracking = wrapTrackingFunction(extra.range, extra.loc);
        extra.parseAdditiveExpression = parseAdditiveExpression;
        extra.parseAssignmentExpression = parseAssignmentExpression;
        extra.parseBitwiseANDExpression = parseBitwiseANDExpression;
        extra.parseBitwiseORExpression = parseBitwiseORExpression;
        extra.parseBitwiseXORExpression = parseBitwiseXORExpression;
        extra.parseBlock = parseBlock;
        extra.parseFunctionSourceElements = parseFunctionSourceElements;
        extra.parseCallMember = parseCallMember;
        extra.parseCatchClause = parseCatchClause;
        extra.parseComputedMember = parseComputedMember;
        extra.parseConditionalExpression = parseConditionalExpression;
        extra.parseConstLetDeclaration = parseConstLetDeclaration;
        extra.parseEqualityExpression = parseEqualityExpression;
        extra.parseExpression = parseExpression;
        extra.parseForVariableDeclaration = parseForVariableDeclaration;
        extra.parseFunctionDeclaration = parseFunctionDeclaration;
        extra.parseFunctionExpression = parseFunctionExpression;
        extra.parseLogicalANDExpression = parseLogicalANDExpression;
        extra.parseLogicalORExpression = parseLogicalORExpression;
        extra.parseMultiplicativeExpression = parseMultiplicativeExpression;
        extra.parseNewExpression = parseNewExpression;
        extra.parseNonComputedMember = parseNonComputedMember;
        extra.parseNonComputedProperty = parseNonComputedProperty;
        extra.parseObjectProperty = parseObjectProperty;
        extra.parseObjectPropertyKey = parseObjectPropertyKey;
        extra.parsePostfixExpression = parsePostfixExpression;
        extra.parsePrimaryExpression = parsePrimaryExpression;
        extra.parseProgram = parseProgram;
        extra.parsePropertyFunction = parsePropertyFunction;
        extra.parseRelationalExpression = parseRelationalExpression;
        extra.parseStatement = parseStatement;
        extra.parseShiftExpression = parseShiftExpression;
        extra.parseSwitchCase = parseSwitchCase;
        extra.parseUnaryExpression = parseUnaryExpression;
        extra.parseVariableDeclaration = parseVariableDeclaration;
        extra.parseVariableIdentifier = parseVariableIdentifier;
        parseAdditiveExpression = wrapTracking(extra.parseAdditiveExpression);
        parseAssignmentExpression = wrapTracking(extra.parseAssignmentExpression);
        parseBitwiseANDExpression = wrapTracking(extra.parseBitwiseANDExpression);
        parseBitwiseORExpression = wrapTracking(extra.parseBitwiseORExpression);
        parseBitwiseXORExpression = wrapTracking(extra.parseBitwiseXORExpression);
        parseBlock = wrapTracking(extra.parseBlock);
        parseFunctionSourceElements = wrapTracking(extra.parseFunctionSourceElements);
        parseCallMember = wrapTracking(extra.parseCallMember);
        parseCatchClause = wrapTracking(extra.parseCatchClause);
        parseComputedMember = wrapTracking(extra.parseComputedMember);
        parseConditionalExpression = wrapTracking(extra.parseConditionalExpression);
        parseConstLetDeclaration = wrapTracking(extra.parseConstLetDeclaration);
        parseEqualityExpression = wrapTracking(extra.parseEqualityExpression);
        parseExpression = wrapTracking(extra.parseExpression);
        parseForVariableDeclaration = wrapTracking(extra.parseForVariableDeclaration);
        parseFunctionDeclaration = wrapTracking(extra.parseFunctionDeclaration);
        parseFunctionExpression = wrapTracking(extra.parseFunctionExpression);
        parseLogicalANDExpression = wrapTracking(extra.parseLogicalANDExpression);
        parseLogicalORExpression = wrapTracking(extra.parseLogicalORExpression);
        parseMultiplicativeExpression = wrapTracking(extra.parseMultiplicativeExpression);
        parseNewExpression = wrapTracking(extra.parseNewExpression);
        parseNonComputedMember = wrapTracking(extra.parseNonComputedMember);
        parseNonComputedProperty = wrapTracking(extra.parseNonComputedProperty);
        parseObjectProperty = wrapTracking(extra.parseObjectProperty);
        parseObjectPropertyKey = wrapTracking(extra.parseObjectPropertyKey);
        parsePostfixExpression = wrapTracking(extra.parsePostfixExpression);
        parsePrimaryExpression = wrapTracking(extra.parsePrimaryExpression);
        parseProgram = wrapTracking(extra.parseProgram);
        parsePropertyFunction = wrapTracking(extra.parsePropertyFunction);
        parseRelationalExpression = wrapTracking(extra.parseRelationalExpression);
        parseStatement = wrapTracking(extra.parseStatement);
        parseShiftExpression = wrapTracking(extra.parseShiftExpression);
        parseSwitchCase = wrapTracking(extra.parseSwitchCase);
        parseUnaryExpression = wrapTracking(extra.parseUnaryExpression);
        parseVariableDeclaration = wrapTracking(extra.parseVariableDeclaration);
        parseVariableIdentifier = wrapTracking(extra.parseVariableIdentifier);
      }
      if (typeof extra.tokens !== 'undefined') {
        extra.advance = advance;
        extra.scanRegExp = scanRegExp;
        advance = collectToken;
        scanRegExp = collectRegex;
      }
    }
    function unpatch() {
      if (typeof extra.skipComment === 'function') {
        skipComment = extra.skipComment;
      }
      if (extra.raw) {
        createLiteral = extra.createLiteral;
      }
      if (extra.range || extra.loc) {
        parseAdditiveExpression = extra.parseAdditiveExpression;
        parseAssignmentExpression = extra.parseAssignmentExpression;
        parseBitwiseANDExpression = extra.parseBitwiseANDExpression;
        parseBitwiseORExpression = extra.parseBitwiseORExpression;
        parseBitwiseXORExpression = extra.parseBitwiseXORExpression;
        parseBlock = extra.parseBlock;
        parseFunctionSourceElements = extra.parseFunctionSourceElements;
        parseCallMember = extra.parseCallMember;
        parseCatchClause = extra.parseCatchClause;
        parseComputedMember = extra.parseComputedMember;
        parseConditionalExpression = extra.parseConditionalExpression;
        parseConstLetDeclaration = extra.parseConstLetDeclaration;
        parseEqualityExpression = extra.parseEqualityExpression;
        parseExpression = extra.parseExpression;
        parseForVariableDeclaration = extra.parseForVariableDeclaration;
        parseFunctionDeclaration = extra.parseFunctionDeclaration;
        parseFunctionExpression = extra.parseFunctionExpression;
        parseLogicalANDExpression = extra.parseLogicalANDExpression;
        parseLogicalORExpression = extra.parseLogicalORExpression;
        parseMultiplicativeExpression = extra.parseMultiplicativeExpression;
        parseNewExpression = extra.parseNewExpression;
        parseNonComputedMember = extra.parseNonComputedMember;
        parseNonComputedProperty = extra.parseNonComputedProperty;
        parseObjectProperty = extra.parseObjectProperty;
        parseObjectPropertyKey = extra.parseObjectPropertyKey;
        parsePostfixExpression = extra.parsePostfixExpression;
        parsePrimaryExpression = extra.parsePrimaryExpression;
        parseProgram = extra.parseProgram;
        parsePropertyFunction = extra.parsePropertyFunction;
        parseRelationalExpression = extra.parseRelationalExpression;
        parseStatement = extra.parseStatement;
        parseShiftExpression = extra.parseShiftExpression;
        parseSwitchCase = extra.parseSwitchCase;
        parseUnaryExpression = extra.parseUnaryExpression;
        parseVariableDeclaration = extra.parseVariableDeclaration;
        parseVariableIdentifier = extra.parseVariableIdentifier;
      }
      if (typeof extra.scanRegExp === 'function') {
        advance = extra.advance;
        scanRegExp = extra.scanRegExp;
      }
    }
    function stringToArray(str) {
      var length = str.length, result = [], i;
      for (i = 0; i < length; ++i) {
        result[i] = str.charAt(i);
      }
      return result;
    }
    function parse(code, options) {
      var program = {};
      if (typeof code !== 'string' && !(code instanceof String)) {
        code = String(code);
      }
      source = code;
      index = 0;
      lineNumber = source.length > 0 ? 1 : 0;
      lineStart = 0;
      length = source.length;
      buffer = null;
      state = {
        allowIn: true,
        labelSet: {},
        lastParenthesized: null,
        inFunctionBody: false,
        inIteration: false,
        inSwitch: false
      };
      extra = {};
      if (typeof options !== 'undefined') {
        extra.range = typeof options.range === 'boolean' && options.range;
        extra.loc = typeof options.loc === 'boolean' && options.loc;
        extra.raw = typeof options.raw === 'boolean' && options.raw;
        if (typeof options.tokens === 'boolean' && options.tokens) {
          extra.tokens = [];
        }
        if (typeof options.comment === 'boolean' && options.comment) {
          extra.comments = [];
        }
        if (typeof options.tolerant === 'boolean' && options.tolerant) {
          extra.errors = [];
        }
      }
      if (length > 0) {
        if (typeof source[0] === 'undefined') {
          // Try first to convert to a string. This is good as fast path
          // for old IE which understands string indexing for string
          // literals only and not for string object.
          if (code instanceof String) {
            source = code.valueOf();
          }
          // Force accessing the characters via an array.
          if (typeof source[0] === 'undefined') {
            source = stringToArray(code);
          }
        }
      }
      patch();
      try {
        program = parseProgram();
        if (typeof extra.comments !== 'undefined') {
          filterCommentLocation();
          program.comments = extra.comments;
        }
        if (typeof extra.tokens !== 'undefined') {
          filterTokenLocation();
          program.tokens = extra.tokens;
        }
        if (typeof extra.errors !== 'undefined') {
          program.errors = extra.errors;
        }
      } catch (e) {
        throw e;
      } finally {
        unpatch();
        extra = {};
      }
      return program;
    }
    // Sync with package.json.
    exports.version = '1.0.0-dev';
    exports.parse = parse;
    // Deep copy.
    exports.Syntax = function () {
      var name, types = {};
      if (typeof Object.create === 'function') {
        types = Object.create(null);
      }
      for (name in SyntaxStrings) {
        if (SyntaxStrings.hasOwnProperty(name)) {
          types[name] = SyntaxStrings[name];
        }
      }
      if (typeof Object.freeze === 'function') {
        Object.freeze(types);
      }
      return types;
    }();
  }(typeof exports === 'undefined' ? esprima = {} : exports));
}.call(this, typeof exports === 'undefined' ? esprima_ljs = {} : exports));

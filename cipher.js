/*
Copyright 2021 Rishat D. Kagirov (iEPCBM)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
var alphabets = {
  "ru": "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЫЩЬЪЭЮЯ 1234567890!\"№;%:?*()_+-=.,",
  "en": "ABCDEFGHIJKLMNOPQRSTUVWXYZ 1234567890!@#$%^&*()_+-=.,;:\""
}

function extractData(strFormId) {
  langId = $("#sel-lang-"+strFormId).val();
  return {
    alphabet: ((langId!=="custom")?
      alphabets[langId]:$("#te-alphabet-"+strFormId).val()),
    text: $("#ta-text-"+strFormId).val(),
    key: $("#te-key-"+strFormId).val(),
    resultTeObj: $("#ta-result-"+strFormId)
  };
};

function encrypt(text, key, alphabet) {
  text = text.toUpperCase();
  key = key.toUpperCase();
  maxLen = Math.max(text.length, key.length);
  encText = "";
  for (i=0; i<maxLen; i++) {
    lkid = alphabet.indexOf(key[i%key.length]);
    ltid = alphabet.indexOf(text[i%text.length]);
    encText+=alphabet[(lkid+ltid)%alphabet.length];
  }
  return encText;
};

function decrypt(text, key, alphabet) {
  text = text.toUpperCase();
  key = key.toUpperCase();
  maxLen = Math.max(text.length, key.length);
  dencText = "";
  for (i=0; i<maxLen; i++) {
    lkid = alphabet.indexOf(key[i%key.length]);
    ltid = alphabet.indexOf(text[i%text.length]);
    dencText+=alphabet[(alphabet.length+ltid-lkid)%alphabet.length];
  }
  return dencText;
};

$(document).ready(function() {
  $("#btn-encry").click(function() {
    let data = extractData("encription");
    let encText = encrypt(data.text, data.key, data.alphabet);
    data.resultTeObj.val(encText);
  });
  $("#btn-decry").click(function() {
    let data = extractData("decription");
    let decText = decrypt(data.text, data.key, data.alphabet);
    data.resultTeObj.val(decText);
  });

  $("#sel-lang-encription").on("change", function(strId) {
    $("#te-alphabet-encription").prop("disabled", !(this.value==="custom"));
  });

  $("#sel-lang-decription").on("change", function(strId) {
    $("#te-alphabet-decription").prop("disabled", !(this.value==="custom"));
  });

});

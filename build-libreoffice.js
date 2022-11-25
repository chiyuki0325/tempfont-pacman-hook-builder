#!/usr/bin/node

var package_name = "libreoffice-fresh";  // or Still variant
var hidden_fonts_dir = "/usr/share/fonts/ms"; // hidden fonts like ".SimSun.ttc" in this directory
var temp_fonts_dir = "~/.fonts/ms-tmp"; // should be writable

function generate_hook(program){
    return(`#!/bin/bash
ARGS="$@";bwrap --dev-bind / / --tmpfs ${temp_fonts_dir} /bin/bash -c "for file in \\$(find ${hidden_fonts_dir} -name '.*' | grep tt | sed -s 's#${hidden_fonts_dir}/.##');do cp ${hidden_fonts_dir}/.\\$file ${temp_fonts_dir}/\\$file;done;ls ${temp_fonts_dir};/usr/bin/${program}.bak \\"$ARGS\\""`);
};

var generated_hook = `[Trigger]
Operation = Install
Operation = Upgrade
Type = Package
Target = ${package_name}
[Action]
When = PostTransaction
Exec = /usr/bin/bash -c ' mv /usr/bin/libreoffice /usr/bin/libreoffice.bak; echo "${btoa(generate_hook('libreoffice'))}" | base64 -d > /usr/bin/libreoffice; chmod +x /usr/bin/libreoffice'`;

console.log(generated_hook);

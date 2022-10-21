#!/usr/bin/node

var package_name = "wps-office-cn";  // or WPS Office CN variant
var hidden_fonts_dir = "/usr/share/fonts/ms"; // hidden fonts like ".SimSun.ttc" in this directory
var temp_fonts_dir = "~/.fonts/ms-tmp"; // should be writable

function generate_hook(program){
    return(`#!/bin/bash
bwrap --dev-bind / / --tmpfs ${temp_fonts_dir} /bin/bash -c "for file in $(find ${hidden_fonts_dir} -name '.*' | grep tt | sed -s 's#${hidden_fonts_dir}/.##');do cp ${hidden_fonts_dir}/ms/.\\$file ${temp_fonts_dir}/\\$file;done;ls ${temp_fonts_dir};/usr/bin/${program}.bak \"$@\""`);
};

var generated_hook = `[Trigger]
Operation = Install
Operation = Upgrade
Type = Package
Target = ${package_name}
[Action]
When = PostTransaction
Exec = /usr/bin/bash -c 'mv /usr/bin/wps /usr/bin/wps.bak; mv /usr/bin/wpp /usr/bin/wpp.bak; mv /usr/bin/et /usr/bin/et.bak; mv /usr/bin/wpspdf /usr/bin/wpspdf.bak; echo "${btoa(generate_hook('wps'))}" | base64 -d > /usr/bin/wps; echo "${btoa(generate_hook('wpp'))}" | base64 -d > /usr/bin/wpp; echo "${btoa(generate_hook('et'))}" | base64 -d > /usr/bin/et; echo "${btoa(generate_hook('wpspdf'))}" | base64 -d > /usr/bin/wpspdf; chmod +x /usr/bin/wps; chmod +x /usr/bin/wpp; chmod +x /usr/bin/et; chmod +x /usr/bin/wpspdf'`;

console.log(generated_hook);

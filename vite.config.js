import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'

export default defineConfig({
    resolve:{
        alias :{
                'comps' : resolve(__dirname ,'src/components'),
                'style' : resolve(__dirname ,'src/style'),
                'utils' : resolve(__dirname ,'src/utils'),
                'json' : resolve(__dirname ,'src/json'),
                'demo' : resolve(__dirname ,'src/demo')
              }
    },
    plugins : [vue()]
})
#!/usr/bin/env node

import { init } from './utils/init.js';
import {getAnswers} from './utils/answers.js';
import {templateGenerate} from './utils/template-generate.js';


init();
const answers = await getAnswers();
await templateGenerate(answers);

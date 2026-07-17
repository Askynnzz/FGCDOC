import React from 'react';
import { renderToString } from 'react-dom/server';
import GlossaryModule from './src/components/modules/Glossary/GlossaryModule.jsx';
import LearningModule from './src/components/modules/Learning/LearningModule.jsx';

try {
  console.log("Rendering GlossaryModule...");
  renderToString(React.createElement(GlossaryModule));
  console.log("GlossaryModule rendered successfully.");
} catch (e) {
  console.error("GlossaryModule Error:", e);
}

try {
  console.log("Rendering LearningModule...");
  renderToString(React.createElement(LearningModule));
  console.log("LearningModule rendered successfully.");
} catch (e) {
  console.error("LearningModule Error:", e);
}

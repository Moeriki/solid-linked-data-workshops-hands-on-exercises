import fs from 'node:fs/promises';

import jsonld from 'jsonld';

// Read JSONLD
const doc = JSON.parse(await fs.readFile('exercise-1-1.jsonld'));

// Write RDF
const rdf = await jsonld.toRDF(doc, { format: 'application/n-quads' });
await fs.writeFile('exercise-1-2.rdf', rdf);

// Write frame of organisation
const framed = await jsonld.frame(doc, {
  '@context': { '@vocab': 'http://xmlns.com/foaf/0.1/' },
  '@type': 'Organization',
});
await fs.writeFile('exercise-1-2-frame.jsonld', JSON.stringify(framed));

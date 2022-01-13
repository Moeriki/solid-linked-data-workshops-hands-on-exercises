import fs from 'node:fs/promises';

import fastify from 'fastify';

import N3 from 'n3';

// TODO https://data.vlaanderen.be/doc/applicatieprofiel/persoon-basis/

const parser = new N3.Parser({ format: 'text/turtle' });
const writer = new N3.Writer({ format: 'N-Triples' });

fastify({ logger: true })
  .get('/', async (request, reply) => {
    const buffer = await fs.readFile('dieter.ttl');
    const quads = parser.parse(buffer.toString());
    for (const quad of quads) {
      writer.addQuad(quad.subject, quad.predicate, quad.object);
    }
    writer.end((error, result) => {
      reply.send(result);
    });
  })
  .listen(3001);

# Exercise 4.2

Based on your solution for exercise 4.1,
get the English names of Yoda's students.

```sparql
PREFIX wd: <http://www.wikidata.org/entity/>
PREFIX schema: <http://schema.org/>

SELECT ?name WHERE {
  wd:Q51730 wdt:P802 ?student
            ; schema:name "?name"@en
            .
}
```

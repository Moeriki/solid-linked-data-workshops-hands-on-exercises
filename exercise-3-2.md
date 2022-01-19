# Exercise 3.2

Create YARRRML rules to convert the person and organization data below into RDF.
Do not forget to link the people to their organizations through your rules.
Use the FOAF vocabulary for modeling, as you have done for exercise 1.1.

Tip: test your YARRRML rules via [Matey](https://rml.io/yarrrml/matey/).

## Person data

```csv
id,firstname,lastname,name,nickname,org-id
0,Gwendolyne,Stacy,,Gwen,new-u
1,,,T'Challa,Black Panther,avngrs
2,Wanda,Maximoff,,Scarlet Witch,avngrs
3,Rita,Clarkson,,,new-u
```

## Organization data

```json
[
  {
    "id": "new-u",
    "name": "New U Technologies"
  },
  {
    "id": "avngrs",
    "name": "Avengers"
  }
]
```

## Solution

```yaml
prefixes:
  foaf: http://xmlns.com/foaf/0.1/

mappings:
  person:
    sources:
      - ['people.csv~csv']
    s: http://example.com/$(id)-$(nickname)
    po:
      - [a, foaf:Person]
      - [foaf:givenName, $(firstname)]
      - [foaf:familyName, $(lastname)]
      - [foaf:name, $(name)]
      - [foaf:nick, $(nickname)]
      - p: e:member
        o:
          mapping: organisation
          condition:
            function: equal
            parameters:
              - [str1, $(org-id), s]
              - [str2, $(id), o]
  organisation:
    sources:
      - ['organisations.json~jsonpath', '$.organisations[*]']
    s: http://example.com/$(id)-$(name)
    po:
      - [a, foaf:Organisation]
      - [foaf:name, $(name)]
```

```turtle
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.

<http://example.com/0-Gwen> a foaf:Person;
    foaf:givenName "Gwendolyne";
    foaf:familyName "Stacy";
    foaf:nick "Gwen";
    <e:member> <http://example.com/new-u-New%20U%20Technologies>.
<http://example.com/1-Black%20Panther> a foaf:Person;
    foaf:name "T'Challa";
    foaf:nick "Black Panther";
    <e:member> <http://example.com/avngrs-Avengers>.
<http://example.com/2-Scarlet%20Witch> a foaf:Person;
    foaf:givenName "Wanda";
    foaf:familyName "Maximoff";
    foaf:nick "Scarlet Witch";
    <e:member> <http://example.com/avngrs-Avengers>.
<http://example.com/new-u-New%20U%20Technologies> a foaf:Organisation;
    foaf:name "New U Technologies".
<http://example.com/avngrs-Avengers> a foaf:Organisation;
    foaf:name "Avengers".
```

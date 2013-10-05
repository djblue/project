# Routes 

## Statistics

The statistics route provides access to the gathered statistical data.

### Query

There are four query parameter for the statistics route:

1. term - which academic semester to grab data from; default current
   semester.
2. week - which week of the year to grad data from; default current week. 
3. day - which day of the week to grab data from; default is current day.

The first three must be specified the order about. You can think about
using these options to narrow in on which time span you wish to view.

_Example_: grab stats form Fall semester 2013, week 34 of the year, and
day 5 of the week.
    
    /statistics?term=FA2013&week=41&day=5

Finally:

The span argument is optional and sets up the difference between time
points.

* span
    - term -> weekly 
    - week -> daily
    - day  -> hourly

Example: view all days of the current semester.

    /statsistics?span=daily

### Output

Which ever options you select, the result will be an array of JSON objects
of the form:

```javascript
{
    "questions": {
        "subject_id": "count",  // The subject mapped to the number of
        "subject_id": "count"   // questions adked for said subject.
    },
    "time": ,                   // The total time to finish all questions.
    "total": ,                  // The total nubmer of questions.
    "label":                    // Label for time span [week, day, hour].
}
```

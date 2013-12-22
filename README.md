Stream vs Non-Stream
====================
This is a simple experiment to compare memory usage of programs that read data
from Mongo DB and write it fo a file. One (`./stream.js`) uses stream and the
other (`./regular.js`) does not.


Data Generation
---------------
I included `./dataGenerator.js` that inserts 10,000 records that contain string,
array of strings and array of numbers.
Start up a Mongo DB instance and generate the data.

```bash
$ node dataGenerator.js
```


Running Program w/o Stream
--------------------------
`./regular.js` reads 1,000 records and write it fo a file without using stream.
As it runs, it will print out heap usage everytime garbage collector is run.
As you will see in the output (`./regularOutput.txt`), the heap usage keeps growing.

```bash
$ node regular.js
```

The final result is as follows:

Stats: { num_full_gc: 10,
  num_inc_gc: 163,
  heap_compactions: 10,
  usage_trend: 0,
  estimated_base: 105576272,
  current_base: 137342176,
  min: 10788608,
  max: **137342176** }

Note that when I changed the script to read 10,000 records, the memory shot up
to 1GB and it couldn't finish running in on my MacBook Air.


Running Program with Stream
---------------------------
`./stream.js` reads 1,000 records and write it fo a file using stream.
As it runs, it will print out heap usage everytime garbage collector is run.
As you will see in the output (`./streamOutput.txt`), the heap usage is a lot
lower than that of `./regular.js` and remains consistent.

```bash
$ node stream.js
```

The final result is as follows:

Stats: { num_full_gc: 19,
  num_inc_gc: 181,
  heap_compactions: 19,
  usage_trend: 35691.4,
  estimated_base: 11855146,
  current_base: 8344160,
  min: 8325032,
  max: **14648840** }  // almost 1/10 of what `./regular.js` used

Note that even when I changed the script to read 10,000 records, the memory usage
was consistent and finished running without a problem on my MacBook Air.


Lesson
------
When dealing with data, try to utilize stream as much as possible in order
to save memory resource.

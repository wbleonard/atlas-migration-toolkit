# Atlas Migration Toolkit

A set of tools to help those migrating from the Community Edition of MongoDB to [Atlas](https://www.mongodb.com/cloud/atlas).

## Cluster Stats
The [cluster-stats.js](cluster-stats.js) script executes various MongoDB Shell commands to summarize your existing MongoDB environment. This is not intended as a sizing exercise, but rather a simple utility to help you map your existing runtime environment to its Atlas equivalent. 

The user running the script must have the [dbAdmin](https://docs.mongodb.com/manual/reference/built-in-roles/#dbAdmin) role.

To run the script, save [cluster-stats.js](https://raw.githubusercontent.com/wbleonard/atlas-migration-toolkit/master/cluster-stats.js) to your local machine. You can then pass the script to the shell as follow:

```
mongo < cluster-stats.js
```
Or if you prefer, start the shell and load the script:
```
PRIMARY> load('cluster-stats.js')
```

The results will look as follows:

```
=== Cluster Totals ===

-- Host Information --> Map to AtlasCluster Tier

RAM 	 Storage    vCPU
----- 	 -------    ----
2 GB 	 10 GB 	    2

Electable Nodes
---------------
3

OpLog Stats
-----------
990 MB 		 - Total OpLog size
983 MB 		 - Used Oplog
846 Hours 	 - OpLog window
1 MB 		 - Average OpLog MBs per hour

-- Backup Information --> For calculating backup costs

Data Size
---------
3.835 GB

--- Additional Information of Potential Interest ---

DB Storage
----------
2.296 GB 	 - Total size on disk (compressed data & indexes)
3.835 GB 	 - Total dataSize (uncompressed)
43.79% 		 - compression (total dataSize -> total size on disk)

Disk Space Used
---------------
4.1 GB 	 - Total File System Used
10 GB 	 - Total File System Size
41.04% 	 - Percent File System Used
```





# Atlas Migration Toolkit

A set of tools to help those migrating from the Community Edition of MongoDB to [Atlas](https://www.mongodb.com/cloud/atlas).

## Cluster Stats
The [cluster-stats.js](cluster-stats.js) script executes various MongoDB Shell commands to summarize your existing MongoDB environment. This is not a intended as a sizing exercise, but rather a simple utility to help you map your existing runtime environment to its Atlas equivalent. Simply the script in your shell as follows: 

```
PRIMARY> load('cluster-stats.js')

=== Cluster Totals ===

-- Host Information --> Map to AtlasCluster Tier

RAM 	 Storage 	 vCPU
--- 	 ------- 	 ----
8 GB 	 100 GB 	 2

Electable Nodes
-----
5

-- Backup Information --> For calculating backup costs

Data Size
---------
1.597 GB

--- Additional Information of Potential Interest ---

DB Storage
----------
0.645 GB 	 - Total size on disk (compressed data & indexes)
1.597 GB 	 - Total dataSize (uncompressed)
64.43% 		 - compression (total dataSize -> total size on disk)

Disk Space Used
--------------
7.2 GB 	 - Total File System Used
100 GB 	 - Total File System Size
7.20% 	 - Percent File System Used
```





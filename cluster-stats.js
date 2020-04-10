// Compare Data Sizes
// listDatabases reports storageSize + indexSize
// the dataSize is uncompressed

var totalStorageSize = 0;
var totalDataSize = 0;
var printDatabaseDetails = false;

db.getSiblingDB('admin').runCommand({ "listDatabases": 1 }).databases.forEach(
    function(database) { 
        // Get sizes
        storageSize = db.getSiblingDB(database.name).stats().storageSize;
        sizeOnDisk = database.sizeOnDisk;
        dataSize = db.getSiblingDB(database.name).stats().dataSize;
        compression = ((1 - storageSize/dataSize)*100).toFixed(2);
        
        // Convert to MB
        sizeOnDiskMB = (sizeOnDisk/1024/1024).toFixed(3);
        dataSizeMB = (dataSize/1024/1024).toFixed(3);
        

        // Print
        if (printDatabaseDetails) {
            print(database.name)
            print(`  ${sizeOnDiskMB} MB - sizeOnDisk (compressed data & indexes)`);
            print(`  ${dataSizeMB} MB - dataSize (uncompressed)`);
            print(`  ${compression}% compression (dataSize -> storageSize)`);
            print();
        }

        totalStorageSize += storageSize;
        totalDataSize += dataSize;
});

var totalStorageSizeGB = (db.getSiblingDB('admin').runCommand({ "listDatabases": 1 }).totalSize/1024/1024/1024).toFixed(3)
var totalCompression = ((1 - totalStorageSize/totalDataSize)*100).toFixed(2);
var fsUsedSizeGB = (db.getSiblingDB('admin').runCommand({ "dbStats": 1 }).fsUsedSize/1024/1024/1024).toFixed(1)
var fsTotalSizeGB = (db.getSiblingDB('admin').runCommand({ "dbStats": 1 }).fsTotalSize/1024/1024/1024).toFixed(3)
var percentFsUsed = (fsUsedSizeGB/fsTotalSizeGB*100).toFixed(2);

print ('\n=== Cluster Totals ===');

print('\n-- Host Information --> Map to AtlasCluster Tier\n');
var mem = Math.ceil(db.hostInfo().system.memSizeMB/1024);
var cores = db.hostInfo().system.numCores;
print(`RAM \t Storage \t vCPU`);
print(`--- \t ------- \t ----`);
print( `${mem} GB \t ${Math.ceil(fsTotalSizeGB)} GB \t ${cores}`);

print('\nElectable Nodes');
print('-----');
print(`${db.isMaster().hosts.length}`)

print('\n-- Backup Information --> For calculating backup costs');

print('\nData Size');
print('---------');
print(`${(totalDataSize/1024/1024/1024).toFixed(3)} GB`);

print('\n--- Additional Information of Potential Interest ---');


print('\nDB Storage');
print('----------')
print(`${(totalStorageSizeGB)} GB \t - Total size on disk (compressed data & indexes)`);
print(`${(totalDataSize/1024/1024/1024).toFixed(3)} GB \t - Total dataSize (uncompressed)`);
print(`${totalCompression}% \t\t - compression (total dataSize -> total size on disk)`);

print('\nDisk Space Used');
print('--------------')
print(`${fsUsedSizeGB} GB \t - Total File System Used`);
print(`${Math.ceil(fsTotalSizeGB)} GB \t - Total File System Size`);
print(`${percentFsUsed}% \t - File System Used `);
print();








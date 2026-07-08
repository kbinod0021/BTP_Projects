using gmr.sd.ppa as db from '../db/masterdata';

service PpaService {

    entity TimeBlocks
        as projection on db.TimeBlock;

    entity PpaTimeBlockMappings
        as projection on db.PpaTimeBlockMapping;

    entity PpaDcSourceConfigs
        as projection on db.PpaDcSourceConfig;

    entity StagingDcSeHeaders
        as projection on db.StagingDcSeHeader;

    entity StagingDcSeDetails
        as projection on db.StagingDcSeDetails;

    entity DcSourceDetails
        as projection on db.DcSourceDetails;

    entity DcDetails
        as projection on db.DcDetails;

    entity SeSourceDetails
        as projection on db.SeSourceDetails;

    entity SeDetails
        as projection on db.SeDetails;
}
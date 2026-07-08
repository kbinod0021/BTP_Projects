namespace gmr.sd.ppa;

using { cuid, managed} from '@sap/cds/common';


entity TimeBlock : cuid, managed {
    masterId         : String(50) @mandatory @assert.notEmpty;
    timeInterval     : Time    @mandatory @assert.range: [1, 1440];
    timeIntervalUnit : String(10) @mandatory @assert.notEmpty;
    blockNo          : Integer    @mandatory @assert.range: [1, 500];
    startTime        : Time       @mandatory;
    endTime          : Time       @mandatory;
    dataFrequency    : String(20) @mandatory @assert.notEmpty;
}


entity PpaTimeBlockMapping : cuid, managed {
    mappingId  : String(50) @mandatory @assert.notEmpty;
    ppaId      : String(50) @mandatory @assert.notEmpty;
    timeBlock  : Association to TimeBlock @mandatory;
    status     : String(20) @mandatory @assert.notEmpty;
}


entity PpaDcSourceConfig : cuid, managed {
    dcConfigId           : String(50)  @mandatory @assert.notEmpty;
    ppaId                : String(50)  @mandatory @assert.notEmpty;
    destinationCode      : String(50)  @mandatory @assert.notEmpty;
    destinationName      : String(100) @mandatory @assert.notEmpty;
    contractedCapacity   : Decimal(15,3) @mandatory @assert.range: [0, 999999999999.999];
    unit                 : String(10)  @mandatory @assert.notEmpty;
    agreedLossPercent    : Decimal(5,2)  @assert.range: [0, 100];
    lossApplicationType  : String(20)  @mandatory @assert.notEmpty;
    destinationSequence  : Integer     @mandatory @assert.range: [1, 999];
    isPrimaryDestination : Boolean     default false;
    validFrom            : Date        @mandatory;
    validTo              : Date;
    status               : String(20)  @mandatory @assert.notEmpty;
}


entity StagingDcSeHeader : cuid, managed {
    stagingHeaderId      : String(50) @mandatory @assert.notEmpty;
    ppaCode              : String(50) @mandatory @assert.notEmpty;
    dcConfig             : Association to PpaDcSourceConfig @mandatory;
    reportingDateTime    : Timestamp  @mandatory;
    dcApplicableDateTime : Timestamp  @mandatory;
    dcRevisionNo         : Integer    @mandatory @assert.range: [0, 9999];
    sgRevisionNo         : Integer    @assert.range: [0, 9999];
    dataSource           : String(50) @mandatory @assert.notEmpty;
    isProcessed          : Boolean    default false;
    fileName             : String(255);
    userId               : String(50) @mandatory @assert.notEmpty;
    integrationDateTime  : Timestamp;
}


entity StagingDcSeDetails : cuid, managed {
    detailId        : String(50)  @mandatory @assert.notEmpty;
    stagingHeader   : Association to StagingDcSeHeader @mandatory;
    destinationName : String(100) @mandatory @assert.notEmpty;
    timeOfUse       : String(20)  @mandatory @assert.notEmpty;
    timeBlock       : Association to TimeBlock @mandatory;
    timeFrom        : Time @mandatory;
    timeTo          : Time @mandatory;
    dcCapacity      : Decimal(15,3) @assert.range: [0, 999999999999.999];
    seCapacity      : Decimal(15,3) @assert.range: [0, 999999999999.999];
    unit            : String(10)    @mandatory @assert.notEmpty;
    errorFlag       : Boolean       default false;
    errorDetails    : String(500);
}


entity DcSourceDetails : cuid, managed {
    sourceDetailId  : String(50) @mandatory @assert.notEmpty;
    ppaId           : String(50) @mandatory @assert.notEmpty;
    dcConfig        : Association to PpaDcSourceConfig @mandatory;
    stagingHeader   : Association to StagingDcSeHeader;
    day             : Date       @mandatory;
    blockNo         : Integer    @mandatory @assert.range: [1, 500];
    timeFrom        : Time       @mandatory;
    timeTo          : Time       @mandatory;
    timeOfUse       : String(20) @mandatory @assert.notEmpty;
    rawDcTotal      : Decimal(15,3) @assert.range: [0, 999999999999.999];
    lossPercent     : Decimal(5,2)  @assert.range: [0, 100];
    lossValue       : Decimal(15,3);
    dcValueForCalc  : Decimal(15,3);
    unit            : String(10)    @mandatory @assert.notEmpty;
    status          : String(20)    @mandatory @assert.notEmpty;
    remark          : String(255);
}


entity DcDetails : cuid, managed {
    detailId     : String(50) @mandatory @assert.notEmpty;
    ppaId        : String(50) @mandatory @assert.notEmpty;
    day          : Date       @mandatory;
    blockNo      : Integer    @mandatory @assert.range: [1, 500];
    timeFrom     : Time       @mandatory;
    timeTo       : Time       @mandatory;
    timeOfUse    : String(20) @mandatory @assert.notEmpty;
    finalDcTotal : Decimal(15,3) @assert.range: [0, 999999999999.999];
    sourceCount  : Integer    @assert.range: [0, 999];
    rawDcTotal   : Decimal(15,3);
    lossTotal    : Decimal(15,3);
    unit         : String(10) @mandatory @assert.notEmpty;
    status       : String(20) @mandatory @assert.notEmpty;
    remark       : String(255);
}


entity SeSourceDetails : cuid, managed {
    sourceDetailId     : String(50) @mandatory @assert.notEmpty;
    ppaId              : String(50) @mandatory @assert.notEmpty;
    dcConfig           : Association to PpaDcSourceConfig @mandatory;
    stagingHeader      : Association to StagingDcSeHeader;
    day                : Date       @mandatory;
    blockNo            : Integer    @mandatory @assert.range: [1, 500];
    timeFrom           : Time       @mandatory;
    timeTo             : Time       @mandatory;
    timeOfUse          : String(20) @mandatory @assert.notEmpty;
    seValue            : Decimal(15,3) @assert.range: [0, 999999999999.999];
    isBelowNormalAvail : Boolean default false;
    unit               : String(10) @mandatory @assert.notEmpty;
    status             : String(20) @mandatory @assert.notEmpty;
    remark             : String(255);
}


entity SeDetails : cuid, managed {
    detailId           : String(50) @mandatory @assert.notEmpty;
    ppaId              : String(50) @mandatory @assert.notEmpty;
    day                : Date       @mandatory;
    blockNo            : Integer    @mandatory @assert.range: [1, 500];
    timeFrom           : Time       @mandatory;
    timeTo             : Time       @mandatory;
    timeOfUse          : String(20) @mandatory @assert.notEmpty;
    seTotal            : Decimal(15,3) @assert.range: [0, 999999999999.999];
    sourceCount        : Integer    @assert.range: [0, 999];
    unit               : String(10) @mandatory @assert.notEmpty;
    isBelowNormalAvail : Boolean default false;
    status             : String(20) @mandatory @assert.notEmpty;
    remark             : String(255);
}
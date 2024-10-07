export const DELETE_WARNING_TABLE = `DROP TABLE IF EXISTS warnings;`;
export const CREATE_WARNING_TABLE = `CREATE TABLE warnings(
    id UUID DEFAULT uuid_generate_v4(),
    PRIMARY KEY (id),
    reason VARCHAR NOT NULL,
    expire_date DATE NOT NULL,
    phone_id UUID NOT NULL
);`;

export const DELETE_BAN_TABLE = `DROP TABLE IF EXISTS bans;`;
export const CREATE_BAN_TABLE = `CREATE TABLE bans(
    id UUID DEFAULT uuid_generate_v4(),
    PRIMARY KEY (id),
    reason VARCHAR NOT NULL,
    expire_date DATE NOT NULL,
    phone_id UUID NOT NULL
);`;

export const DELETE_PHONE_TABLE = `DROP TABLE IF EXISTS phones`;
export const CREATE_PHONE_TABLE = `CREATE TABLE phones(
    id UUID DEFAULT uuid_generate_v4(),
    PRIMARY KEY (id),
    phone VARCHAR NOT NULL
);`;

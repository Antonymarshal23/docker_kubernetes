"use strict";

import { Exclude } from "class-transformer";
import { Column } from "typeorm";

export class BaseModel {
  @Exclude()
  @Column({ name: 'created_by' })
  createdBy: number;

  @Column({ name: 'created_date' })
  createdDate: string;

  @Exclude()
  @Column({ name: 'modified_by' })
  modifiedBy: number;

  @Exclude()
  @Column({ name: 'modified_date' })
  modifiedDate: string;
}
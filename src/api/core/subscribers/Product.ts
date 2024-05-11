import {
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
  } from 'typeorm';
  import { Product } from '../models/Product';
  
  @EventSubscriber()
  export class PersonSubscriber implements EntitySubscriberInterface<Product> {
    listenTo() {
      return Product;
    }
  
    afterInsert(event: InsertEvent<Product>) {
      console.log(event);
    }
  }
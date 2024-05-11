import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, BeforeInsert, BeforeUpdate, AfterInsert, AfterUpdate, Exclusion } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer'
import { BaseModel } from './BaseModel';
// import moment from 'moment';
import * as moment from 'moment';

@Entity('product')
export class Product extends BaseModel {
  @PrimaryGeneratedColumn({ name: 'product_id' })
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @Column({ name: 'sku' })
  sku: string;

  @Column({ name: 'upc' })
  upc: string;

  @Column({ name: 'hsn' })
  hsn: string;

  @Column({ name: 'location' })
  location: string;

  @IsNotEmpty()
  @Column({ name: 'quantity' })
  quantity: number;

  @Column({ name: 'minimum_quantity' })
  minimumQuantity: number;

  @Column({ name: 'subtract_stock' })
  subtractStock: number;

  @IsNotEmpty()
  @Column({ name: 'stock_status_id' })
  stockStatusId: number;

  @Column({ name: 'quotation_available' })
  quotationAvailable: number;

  @IsNotEmpty()
  @Column({ name: 'image' })
  image: string;

  @Column({ name: 'image_path' })
  imagePath: string;

  @Column({ name: 'manufacturer_id' })
  manufacturerId: number;

  @Column({ name: 'shipping' })
  shipping: number;

  @Column({ name: 'service_charges' })
  serviceCharges: string;

  @Column({ name: 'tax_type' })
  taxType: number;

  @Column({ name: 'tax_value' })
  taxValue: number;

  @IsNotEmpty()
  @Column({ name: 'price' })
  price: number;

  @Column({ name: 'price_update_file_log_id' })
  priceUpdateFileLogId: number;

  @Column({ name: 'sort_order' })
  sortOrder: number;

  @IsNotEmpty()
  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description' })
  description: string;

  @IsNotEmpty()
  @Column({ name: 'amount' })
  amount: number;

  @Column({ name: 'keywords' })
  keywords: string;

  @Column({ name: 'discount' })
  discount: number;

  @Column({ name: 'delete_flag' })
  deleteFlag: number;

  @Column({ name: 'is_featured' })
  isFeatured: number;

  @Column({ name: 'today_deals' })
  todayDeals: number;

  @Column({ name: 'condition' })
  condition: number;

  @Column({ name: 'rating' })
  rating: number;

  @Column({ name: 'wishlist_status' })
  wishListStatus: number;

  @Column({ name: 'product_slug' })
  productSlug: string;

  @IsNotEmpty()
  @Column({ name: 'is_active' })
  isActive: number;

  @Column({ name: 'width' })
  width: string;

  @Column({ name: 'height' })
  height: string;

  @Column({ name: 'length' })
  length: string;

  @Column({ name: 'weight' })
  weight: string;

  @Column({ name: 'has_stock' })
  hasStock: number;

  @Column({ name: 'is_simplified' })
  isSimplified: number;

  @Column({ name: 'owner' })
  owner: number;

  @Column({ name: 'is_common' })
  isCommon: number;

  @Column({ name: 'sku_id' })
  skuId: number;

  @Column({ name: 'has_tire_price' })
  hasTirePrice: number;

  @Column({ name: 'out_of_stock_threshold' })
  outOfStockThreshold: number;

  @Column({ name: 'notify_min_quantity_below' })
  notifyMinQuantity: number;

  @Column({ name: 'min_quantity_allowed_cart' })
  minQuantityAllowedCart: number;

  @Column({ name: 'max_quantity_allowed_cart' })
  maxQuantityAllowedCart: number;

  @Column({ name: 'enable_back_orders' })
  enableBackOrders: number;

  @Column({ name: 'pincode_based_delivery' })
  pincodeBasedDelivery: number;

  @Column({ name: 'attribute_keyword' })
  attributeKeyword: string;

  @Column({ name: 'setted_as_common_on' })
  settedAsCommonOn: string;

  @Exclude()
  @Column({ name: 'update_count' })
  updateCount: number;

  @BeforeInsert()
  async createDetails() {
    this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
  }

  @BeforeUpdate()
  async updateDetails() {
    this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
  }
}
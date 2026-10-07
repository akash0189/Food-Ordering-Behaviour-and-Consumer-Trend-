# 📊 Data Dictionary: Food Ordering Behaviour and Consumer Trend

## 1. Overview & Data Grain
This document outlines the data model, field definitions, categorical domains, and derived metrics used in the **Food Ordering Behaviour and Consumer Trend** analytics dashboard. 

- **Data Grain**: 1 row per order item / order transaction.
- **Domain**: Food Tech, Quick-Commerce, On-Demand Delivery & Consumer Behavioral Analytics.
- **Primary Keys**: `order_id`, `customer_id`

---

## 2. Entity Schema & Attribute Catalog

| Column Name | Data Type | Constraint | Description | Example Values |
|:---|:---|:---|:---|:---|
| `order_id` | String / Alphanumeric | Primary Key | Unique transaction identifier | `ORD-2024-89211`, `ORD-10492` |
| `customer_id` | String / Alphanumeric | Foreign Key | Unique identifier for consumer entity | `CUST-7729`, `CUST-3104` |
| `order_timestamp` | DateTime | NOT NULL | Exact timestamp when order was placed | `2024-03-15 19:42:10` |
| `order_date` | Date | NOT NULL | Date normalized from timestamp | `2024-03-15` |
| `order_hour` | Integer (0-23) | NOT NULL | Hour of day (24-hour clock) for peak analysis | `12`, `19`, `21` |
| `day_of_week` | String | NOT NULL | Day name for weekday vs. weekend analysis | `Friday`, `Saturday`, `Sunday` |
| `cuisine_type` | Categorical String | NOT NULL | Categorization of food cuisine | `North Indian`, `Italian`, `Fast Food`, `Chinese`, `Desserts` |
| `restaurant_name` | String | NOT NULL | Partner merchant / restaurant name | `Urban Spice Grill`, `Pasta Fresca` |
| `restaurant_city` | Categorical String | NOT NULL | Geographic metro area | `Bengaluru`, `Mumbai`, `Delhi NCR` |
| `item_count` | Integer | > 0 | Total distinct or unit items ordered | `2`, `4`, `1` |
| `subtotal_amount` | Decimal(10,2) | >= 0 | Base cost of menu items before tax/fee | `340.00`, `750.50` |
| `discount_amount` | Decimal(10,2) | >= 0 | Total promotional coupon discounts applied | `50.00`, `0.00` |
| `delivery_fee` | Decimal(10,2) | >= 0 | Fee charged for order delivery | `30.00`, `0.00` |
| `total_order_amount` | Decimal(10,2) | > 0 | Final billing amount paid by consumer | `365.50`, `820.00` |
| `payment_method` | Categorical String | NOT NULL | Payment instrument utilized | `UPI`, `Credit Card`, `Debit Card`, `Cash on Delivery` |
| `order_status` | Categorical String | NOT NULL | Final fulfillment disposition | `Delivered`, `Cancelled`, `Refunded` |
| `prep_time_mins` | Integer | >= 0 | Restaurant food preparation time in minutes | `15`, `25` |
| `delivery_time_mins`| Integer | >= 0 | Total transit duration from restaurant to customer | `22`, `35` |
| `total_fulfillment_mins` | Integer | >= 0 | Sum of prep time and transit time | `37`, `55` |
| `customer_rating` | Decimal(2,1) | 1.0 - 5.0 | Consumer post-order satisfaction rating | `4.5`, `5.0`, `3.2` |
| `customer_segment` | Categorical String | Derived | Loyalty tier or frequency tier | `New Customer`, `Frequent User`, `Power Diner` |

---

## 3. Key Calculated Fields & Performance Metrics

### 1. Average Order Value (AOV)
- **Formula**:
  $$\text{AOV} = \frac{\sum \text{Total Order Amount}}{\text{Total Completed Orders}}$$
- **Business Purpose**: Evaluates basket size trends across lunch vs. dinner windows and informs minimum order value thresholds for promotions.

### 2. Peak Demand Index (Hourly Concentration)
- **Formula**:
  $$\text{\% Order Volume by Hour} = \frac{\text{Count of Orders in Hour } h}{\text{Total Orders across all Hours}} \times 100$$
- **Business Purpose**: Maps demand spikes to allocate courier fleet density and optimize kitchen surge capacity.

### 3. Customer Retention & Repeat Purchase Rate
- **Formula**:
  $$\text{Repeat Purchase Rate} = \frac{\text{Customers with } \ge 2 \text{ Orders}}{\text{Total Unique Customers}} \times 100$$
- **Business Purpose**: Evaluates customer stickiness, cohort retention, and churn prevention opportunities.

### 4. On-Time Delivery (OTD) Rate
- **Formula**:
  $$\text{OTD \%} = \frac{\text{Orders Delivered Within SLA (< 45 mins)}}{\text{Total Delivered Orders}} \times 100$$
- **Business Purpose**: Measures logistics efficiency and merchant preparation compliance.

---

## 4. Data Quality & Preprocessing Rules
1. **Deduplication**: Transactions with identical `order_id` deduplicated on ingestion.
2. **Missing Value Treatment**: Missing `customer_rating` imputed as `Unrated` / excluded from satisfaction rating averages without distorting volume figures.
3. **Outlier Filtering**: Test orders or extreme order totals ($> 3\sigma$) investigated for B2B bulk catering vs. erroneous entries.
4. **Timezone Standardization**: All timestamps aligned to local standard operational timezone.

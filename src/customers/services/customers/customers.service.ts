import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from '../../dtos/CreateCustomer.dto';
import { Customer } from '../../types/Customers';

@Injectable()
export class CustomersService {
  private customers: Customer[] = [
    {
      id: 1,
      email: 'mymail@mail.ge',
      name: 'giorgi',
    },
    {
      id: 2,
      email: 'asdasd@mail.ge',
      name: 'giorgiasd',
    },
    {
      id: 3,
      email: 'xcxc@rer.ge',
      name: 'giorgizxc',
    },
  ];

  findCustomer(id: number) {
    return this.customers.find((user) => user.id === id);
  }

  createCustomer(customerDto: CreateCustomerDto) {
    this.customers.push(customerDto);
  }

  getCustomers() {
    return this.customers;
  }
}

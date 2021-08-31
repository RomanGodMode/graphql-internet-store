import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import * as bcrypt from 'bcryptjs'

export type UserRole = 'buyer' | 'admin'

export type CartItem = {
  productId: number
  count: number
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 60, unique: true })
  email: string

  @Column({ length: 500 })
  password: string

  @Column({ type: 'text', default: 'buyer' })
  role: UserRole
  // Енамы обнуляются при коннекте к бд (во время синхронизации)
  // я не смог найти даже похожей проблемы в интернете

  //Всё заработало так как надо после обновления docker-desktop

  @BeforeInsert()
  async beforeInsert() {
    this.password = await bcrypt.hash(
      this.password,
      bcrypt.genSaltSync(+process.env.BCRYPT_HASH_ROUND)
    )
  }

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password)
  }

  @Column({ type: 'jsonb', default: { items: [] } })
  cart: {
    items: CartItem[]
  }

  @Column({ type: 'jsonb', default: [] })
  chosenProducts: number[]
}


import React from 'react'
import { Page, Text, Document, StyleSheet, renderToStream } from '@react-pdf/renderer'

type Order = {
  created_at: string;
  final_price: string;
  id: number;
  nickname: string;
  nid: string;
  phone_number: string;
  pickup_time: string;
  resolved_at: string;
  status: string;
  updated_at: string;
};

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  text: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
})

const generatePDFStream = (orders: Order[]) => {
  const OrdersPDF = () => {
    const orderGroupByEach10 = orders.reduce<Order[][]>((groups, item) => {
      let lastGroup = groups[groups.length - 1]
      if (lastGroup === undefined || lastGroup.length === 10)
        groups.push((lastGroup = []))
      lastGroup.push(item)
      return groups
    }, [])
    return (
      <Document>
        {orderGroupByEach10.map(group => (
          <Page size="A4" style={styles.body}>
            {group.map(order => (
              <Text style={styles.text}>
                {order.id} {order.nid}
              </Text>
            ))}
          </Page>
        ))}
      </Document>
    )
  }
  return renderToStream(<OrdersPDF />)
}

export default generatePDFStream;

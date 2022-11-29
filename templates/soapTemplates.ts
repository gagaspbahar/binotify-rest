import { SoapEndpoint } from "../types/request"
import dotenv from 'dotenv';

dotenv.config();


const checkSubscriptionTemplate = 
  `<?xml version="1.0" encoding="utf-8"?>
  <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
      <checkSubscription xmlns="http://service.binotify.com/">
          <subscriber>%d</subscriber>
          <creator>%d</creator>
      </checkSubscription>
    </soap:Body>
  </soap:Envelope>`

const checkSubscription: SoapEndpoint = {
  url: process.env.SOAP_URL || "http://localhost:8888/ws/subscription",
  template: checkSubscriptionTemplate,
  headers: {
    "Content-Type": "text/xml;charset=UTF-8",
    "X-API-KEY": process.env.SOAP_API_KEY
  }
}

export { checkSubscription }
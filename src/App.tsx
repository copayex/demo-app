/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  Settings, 
  ChevronDown, 
  Plus, 
  Search, 
  MoreVertical, 
  Copy, 
  Check, 
  X, 
  Link as LinkIcon,
  CreditCard,
  Building2,
  LogOut,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  Calendar,
  RefreshCcw,
  QrCode,
  Globe,
  User,
  Ban,
  Ticket,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  RotateCcw,
  Trash2,
  Download,
  ShoppingCart,
  Pencil,
  Edit,
  DollarSign
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';
import { View, Ticket as TicketType, PagoRecibido, MetodoPago, QRCode } from './types';

// --- Mock Data ---
const MOCK_TICKETS: TicketType[] = [
  { id: 7, titulo: 'maxStore', descripcion: 'Cobro ticket 321', pagado: 26, total: 135, fecha: '2/4/26, 18:48', status: 'activo', metodosPagoHabilitados: ['cc', 'dc', 'mp', 'tb'] }
];

const MOCK_PAGOS: PagoRecibido[] = [
  { id: 102, ticketId: 7, ticket: '#7 - maxStore', descripcion: 'Juan - Pago parcial', metodoPago: 'Mercado Pago', formaPago: 'Tarjeta de Débito **** 1080', monto: 12.00, fecha: '16/8/25, 13:56', status: 'aprobado' },
  { id: 101, ticketId: 7, ticket: '#7 - maxStore', descripcion: 'Lucas - Pago parcial', metodoPago: 'Mercado Pago', formaPago: 'Tarjeta de Crédito **** 9263', monto: 8.00, fecha: '16/9/25, 21:58', status: 'aprobado' },
  { id: 6, ticketId: 7, ticket: '#7 - maxStore', descripcion: 'María - Pago parcial', metodoPago: 'Talo', formaPago: 'Transferencia Bancaria', monto: 2.50, fecha: '2/4/26, 21:32', status: 'aprobado' },
  { id: 5, ticketId: 7, ticket: '#7 - maxStore', descripcion: 'Pepe - Pago parcial', metodoPago: 'Talo', formaPago: 'Transferencia Bancaria', monto: 3.50, fecha: '2/4/26, 21:30', status: 'aprobado' }
];

const MOCK_QRS: QRCode[] = [
  { id: 1, numero: 'QR #1', estado: 'disponible' },
  { id: 2, numero: 'QR #2', estado: 'en uso', vinculo: '#7' },
  { id: 3, numero: 'QR #3', estado: 'disponible' },
];

const MOCK_METODOS: MetodoPago[] = [
  { id: 'mp', nombre: 'Mercado Pago', descripcion: 'Conectá tu cuenta para acreditar y retirar los cobros de Copayex.', conectado: true, cuenta: '#123456789', titular: 'Juan Perez', email: 'juanperez@mail.com', logo: '/logo_mercado_pago.png' },
  { id: 'talo', nombre: 'Talo', descripcion: 'Conectá tu cuenta para acreditar y retirar los cobros mediante transferencia bancaria con Talo.', conectado: true, cuenta: '#123456789', titular: 'Juan Perez', email: 'juanperez@mail.com', logo: '/logo_talo.png' },
  { id: 'payway', nombre: 'Payway', descripcion: 'Conectá tu cuenta de Payway para recibir pagos con tarjetas de crédito y débito.', conectado: false, logo: '/logo_payway.png' }
];

// --- Helper Functions ---
const getMetodoLogo = (nombre: string) => {
  const metodo = MOCK_METODOS.find(m => m.nombre === nombre);
  return metodo?.logo;
};

const formatCurrency = (amount: number) => {
  const parts = amount.toFixed(2).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return parts.join(',');
};

// --- Components ---

const Logo = ({ className = "h-[29px]" }: { className?: string }) => (
  <div className="flex items-center gap-2">
    <div className={`${className} w-auto flex items-center`}>
      <svg 
        version="1.1" 
        viewBox="0.0 0.0 961.4409448818898 287.26246719160105" 
        fill="none" 
        stroke="none" 
        strokeLinecap="square" 
        strokeMiterlimit="10" 
        xmlnsXlink="http://www.w3.org/1999/xlink" 
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
      >
        <clipPath id="p.0">
          <path d="m0 0l961.4409 0l0 287.26248l-961.4409 0l0 -287.26248z" clipRule="nonzero"/>
        </clipPath>
        <g clipPath="url(#p.0)">
          <path fill="#000000" fillOpacity="0.0" d="m0 0l961.4409 0l0 287.26248l-961.4409 0z" fillRule="evenodd"/>
          <path fill="#000000" fillOpacity="0.0" d="m299.37592 59.411037l645.07086 0l0 196.0l-645.07086 0z" fillRule="evenodd"/>
          <path fill="#3d85c6" d="m356.04532 209.4559q-11.125 0 -19.9375 -5.1875q-8.796875 -5.203125 -13.921875 -14.21875q-5.125 -9.03125 -5.125 -20.4375q0 -11.40625 5.125 -20.421875q5.125 -9.03125 13.921875 -14.21875q8.8125 -5.203125 19.9375 -5.203125q10.25 0 18.84375 3.609375q8.59375 3.609375 13.640625 10.109375l-12.5625 15.015625q-2.015625 -2.3125 -4.765625 -4.328125q-2.734375 -2.03125 -6.0625 -3.1875q-3.3125 -1.15625 -6.921875 -1.15625q-5.5 0 -9.6875 2.53125q-4.171875 2.53125 -6.484375 7.015625q-2.3125 4.46875 -2.3125 10.234375q0 5.484375 2.375 9.96875q2.390625 4.46875 6.578125 7.078125q4.1875 2.59375 9.53125 2.59375q3.75 0 6.921875 -0.9375q3.171875 -0.9375 5.84375 -2.8125q2.671875 -1.890625 4.984375 -4.625l12.421875 15.15625q-4.90625 6.203125 -13.640625 9.8125q-8.734375 3.609375 -18.703125 3.609375zm81.13754 0q-11.984375 0 -21.296875 -5.1875q-9.3125 -5.203125 -14.734375 -14.15625q-5.40625 -8.953125 -5.40625 -20.5q0 -11.546875 5.40625 -20.5q5.421875 -8.953125 14.734375 -14.140625q9.3125 -5.203125 21.296875 -5.203125q11.984375 0 21.296875 5.203125q9.3125 5.1875 14.65625 14.140625q5.34375 8.953125 5.34375 20.5q0 11.546875 -5.34375 20.5q-5.34375 8.953125 -14.65625 14.15625q-9.3125 5.1875 -21.296875 5.1875zm0 -19.921875q5.203125 0 9.234375 -2.59375q4.046875 -2.59375 6.359375 -7.0625q2.3125 -4.484375 2.171875 -10.265625q0.140625 -5.765625 -2.171875 -10.3125q-2.3125 -4.5625 -6.359375 -7.15625q-4.03125 -2.59375 -9.234375 -2.59375q-5.203125 0 -9.3125 2.59375q-4.109375 2.59375 -6.421875 7.15625q-2.3125 4.546875 -2.171875 10.3125q-0.140625 5.78125 2.171875 10.265625q2.3125 4.46875 6.421875 7.0625q4.109375 2.59375 9.3125 2.59375z" fillRule="nonzero"/>
          <path fill="#073763" d="m493.63354 239.78403l0 -108.421875l21.953125 0l0.859375 17.171875l-4.328125 -1.296875q1.0 -4.765625 4.890625 -8.65625q3.90625 -3.90625 9.890625 -6.28125q6.0 -2.390625 12.640625 -2.390625q9.828125 0 17.46875 5.125q7.65625 5.125 12.0625 14.015625q4.40625 8.875 4.40625 20.5625q0 11.546875 -4.40625 20.5q-4.40625 8.953125 -12.140625 14.078125q-7.71875 5.125 -17.671875 5.125q-6.5 0 -12.421875 -2.453125q-5.921875 -2.453125 -9.96875 -6.640625q-4.03125 -4.1875 -5.328125 -9.09375l5.34375 -2.015625l0 50.671875l-23.25 0zm40.0 -49.953125q5.1875 0 9.078125 -2.53125q3.90625 -2.53125 6.0625 -7.0q2.171875 -4.484375 2.171875 -10.6875q0 -6.0625 -2.171875 -10.609375q-2.15625 -4.546875 -5.984375 -7.0625q-3.828125 -2.53125 -9.15625 -2.53125q-5.34375 0 -9.25 2.453125q-3.890625 2.453125 -6.0625 7.078125q-2.171875 4.609375 -2.171875 10.671875q0 6.203125 2.171875 10.6875q2.171875 4.46875 6.0625 7.0q3.90625 2.53125 9.25 2.53125zm83.44006 19.484375q-9.671875 0 -17.25 -5.125q-7.578125 -5.125 -12.0625 -14.140625q-4.46875 -9.03125 -4.46875 -20.4375q0 -11.6875 4.46875 -20.640625q4.484375 -8.953125 12.28125 -14.078125q7.796875 -5.125 17.75 -5.125q5.484375 0 10.03125 1.59375q4.5625 1.578125 8.015625 4.40625q3.46875 2.8125 5.921875 6.5q2.453125 3.671875 3.609375 7.859375l-4.765625 -0.578125l0 -18.1875l22.953125 0l0 76.65625l-23.390625 0l0 -18.484375l5.203125 -0.140625q-1.15625 4.046875 -3.75 7.65625q-2.59375 3.609375 -6.359375 6.359375q-3.75 2.734375 -8.375 4.328125q-4.609375 1.578125 -9.8125 1.578125zm6.359375 -19.484375q5.34375 0 9.234375 -2.453125q3.890625 -2.453125 6.0625 -7.0q2.171875 -4.5625 2.171875 -10.765625q0 -6.203125 -2.171875 -10.75q-2.171875 -4.546875 -6.0625 -7.078125q-3.890625 -2.53125 -9.234375 -2.53125q-5.203125 0 -9.03125 2.53125q-3.828125 2.53125 -6.0 7.078125q-2.15625 4.546875 -2.15625 10.75q0 6.203125 2.15625 10.765625q2.171875 4.546875 6.0 7.0q3.828125 2.453125 9.03125 2.453125zm68.42621 51.390625l17.46875 -41.140625l0.296875 11.828125l-36.96875 -80.546875l26.140625 0l16.171875 38.546875q1.296875 2.875 2.453125 6.203125q1.15625 3.3125 1.71875 6.359375l-3.171875 1.875q0.875 -2.171875 1.953125 -5.421875q1.078125 -3.25 2.375 -7.0l14.15625 -40.5625l26.28125 0l-32.640625 76.65625l-13.28125 33.203125l-22.953125 0zm114.9281 -31.765625q-12.703125 0 -22.09375 -5.125q-9.390625 -5.125 -14.59375 -14.0q-5.1875 -8.875 -5.1875 -20.28125q0 -8.8125 2.890625 -16.171875q2.890625 -7.359375 8.078125 -12.765625q5.203125 -5.421875 12.34375 -8.375q7.15625 -2.96875 15.671875 -2.96875q8.078125 0 14.796875 2.890625q6.71875 2.890625 11.625 8.09375q4.90625 5.1875 7.5 12.265625q2.609375 7.0625 2.3125 15.4375l-0.140625 6.21875l-61.078125 0l-3.3125 -13.0l45.625 0l-2.453125 2.75l0 -2.890625q-0.296875 -3.609375 -2.25 -6.421875q-1.9375 -2.828125 -5.125 -4.40625q-3.171875 -1.59375 -7.21875 -1.59375q-5.625 0 -9.59375 2.25q-3.96875 2.234375 -6.0 6.5q-2.015625 4.25 -2.015625 10.453125q0 6.359375 2.671875 11.046875q2.671875 4.6875 7.796875 7.296875q5.125 2.59375 12.203125 2.59375q4.90625 0 8.734375 -1.4375q3.828125 -1.453125 8.296875 -4.921875l10.828125 15.3125q-4.46875 3.890625 -9.53125 6.34375q-5.046875 2.453125 -10.328125 3.671875q-5.265625 1.234375 -10.453125 1.234375zm94.858154 -1.4375l-16.328125 -24.6875l-7.5 -10.546875l-30.3125 -41.421875l27.71875 0l15.734375 23.53125l8.21875 11.25l29.890625 41.875l-27.421875 0zm-54.875 0l30.90625 -43.03125l12.40625 14.875l-16.015625 28.15625l-27.296875 0zm50.6875 -33.34375l-12.28125 -14.734375l15.15625 -28.578125l27.296875 0l-30.171875 43.3125z" fillRule="nonzero"/>
          <g filter="url(#shadowFilter-p.1)">
            <use xlinkHref="#p.1" transform="matrix(1.0 0.0 0.0 1.0 0.0 2.1657396325459377)"/>
          </g>
          <defs>
            <filter id="shadowFilter-p.1" filterUnits="userSpaceOnUse">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2.1657395" result="blur"/>
              <feComponentTransfer in="blur" colorInterpolationFilters="sRGB">
                <feFuncR type="linear" slope="0" intercept="0.0"/>
                <feFuncG type="linear" slope="0" intercept="0.0"/>
                <feFuncB type="linear" slope="0" intercept="0.0"/>
                <feFuncA type="linear" slope="0.19" intercept="0"/>
              </feComponentTransfer>
            </filter>
          </defs>
          <g id="p.1">
            <path fill="#6fa8dc" d="m175.1295 108.4201c-50.48436 0 -91.41002 30.335503 -91.41002 67.75623q0 33.878113 0 67.756226q45.705017 0 91.41002 0c50.48436 0 91.41002 -30.335495 91.41002 -67.756226c0 -37.42073 -40.92566 -67.75623 -91.41002 -67.75623z" fillRule="evenodd"/>
          </g>
          <g filter="url(#shadowFilter-p.2)">
            <use xlinkHref="#p.2" transform="matrix(1.0 0.0 0.0 1.0 0.0 2.1657396325459377)"/>
          </g>
          <defs>
            <filter id="shadowFilter-p.2" filterUnits="userSpaceOnUse">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2.1657395" result="blur"/>
              <feComponentTransfer in="blur" colorInterpolationFilters="sRGB">
                <feFuncR type="linear" slope="0" intercept="0.0"/>
                <feFuncG type="linear" slope="0" intercept="0.0"/>
                <feFuncB type="linear" slope="0" intercept="0.0"/>
                <feFuncA type="linear" slope="0.19" intercept="0"/>
              </feComponentTransfer>
            </filter>
          </defs>
          <g id="p.2">
            <path fill="#3d85c6" d="m133.55937 81.57402c-47.909615 19.503296 -78.477066 63.754776 -68.274315 98.838455q9.236855 31.762299 18.473717 63.524612q43.37401 -17.656921 86.74803 -35.313843c47.909607 -19.503296 78.47705 -63.754776 68.27431 -98.838455c-10.202744 -35.08367 -57.312134 -47.714066 -105.22174 -28.21077z" fillRule="evenodd"/>
          </g>
          <g filter="url(#shadowFilter-p.3)">
            <use xlinkHref="#p.3" transform="matrix(1.0 0.0 0.0 1.0 0.0 2.1657396325459377)"/>
          </g>
          <defs>
            <filter id="shadowFilter-p.3" filterUnits="userSpaceOnUse">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2.1657395" result="blur"/>
              <feComponentTransfer in="blur" colorInterpolationFilters="sRGB">
                <feFuncR type="linear" slope="0" intercept="0.0"/>
                <feFuncG type="linear" slope="0" intercept="0.0"/>
                <feFuncB type="linear" slope="0" intercept="0.0"/>
                <feFuncA type="linear" slope="0.19" intercept="0"/>
              </feComponentTransfer>
            </filter>
          </defs>
          <g id="p.3">
            <path fill="#0b5394" d="m71.54109 73.20881c-37.033092 39.6465 -49.322495 93.93464 -27.449146 121.25594q19.8026 24.734802 39.605198 49.469604q33.527176 -35.893173 67.05435 -71.78635c37.033096 -39.6465 49.322495 -93.93463 27.449158 -121.255936c-21.873352 -27.321306 -69.626465 -17.329765 -106.65956 22.316738z" fillRule="evenodd"/>
          </g>
        </g>
      </svg>
    </div>
  </div>
);

const LogoPayment = ({ className = "h-[29px]" }: { className?: string }) => (
  <div className="flex items-center gap-2">
    <div className={`${className} w-auto flex items-center`}>
      <svg 
        version="1.1" 
        viewBox="0.0 0.0 961.4409448818898 287.26246719160105" 
        fill="none" 
        stroke="none" 
        strokeLinecap="square" 
        strokeMiterlimit="10" 
        xmlnsXlink="http://www.w3.org/1999/xlink" 
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
      >
        <clipPath id="pp.0">
          <path d="m0 0l961.4409 0l0 287.26248l-961.4409 0l0 -287.26248z" clipRule="nonzero"/>
        </clipPath>
        <g clipPath="url(#pp.0)">
          <path fill="#000000" fillOpacity="0.0" d="m0 0l961.4409 0l0 287.26248l-961.4409 0z" fillRule="evenodd"/>
          <path fill="#000000" fillOpacity="0.0" d="m299.55597 59.55727l644.66144 0l0 195.84253l-644.66144 0z" fillRule="evenodd"/>
          <path fill="#ffffff" d="m356.1909 209.50716q-11.109375 0 -19.90625 -5.1875q-8.796875 -5.203125 -13.921875 -14.21875q-5.125 -9.015625 -5.125 -20.40625q0 -11.40625 5.125 -20.421875q5.125 -9.015625 13.921875 -14.203125q8.796875 -5.203125 19.90625 -5.203125q10.25 0 18.828125 3.609375q8.59375 3.609375 13.640625 10.09375l-12.5625 15.015625q-2.015625 -2.3125 -4.765625 -4.328125q-2.734375 -2.03125 -6.0625 -3.171875q-3.3125 -1.15625 -6.90625 -1.15625q-5.484375 0 -9.671875 2.53125q-4.1875 2.515625 -6.5 6.984375q-2.296875 4.46875 -2.296875 10.25q0 5.484375 2.375 9.953125q2.375 4.46875 6.5625 7.078125q4.1875 2.59375 9.53125 2.59375q3.75 0 6.921875 -0.9375q3.171875 -0.9375 5.84375 -2.8125q2.671875 -1.890625 4.96875 -4.625l12.421875 15.15625q-4.90625 6.203125 -13.640625 9.8125q-8.734375 3.59375 -18.6875 3.59375zm81.086334 0q-11.96875 0 -21.28125 -5.1875q-9.296875 -5.203125 -14.71875 -14.140625q-5.40625 -8.953125 -5.40625 -20.484375q0 -11.546875 5.40625 -20.484375q5.421875 -8.953125 14.71875 -14.140625q9.3125 -5.203125 21.28125 -5.203125q11.984375 0 21.28125 5.203125q9.3125 5.1875 14.640625 14.140625q5.34375 8.9375 5.34375 20.484375q0 11.53125 -5.34375 20.484375q-5.328125 8.9375 -14.640625 14.140625q-9.296875 5.1875 -21.28125 5.1875zm0 -19.90625q5.203125 0 9.234375 -2.59375q4.046875 -2.59375 6.34375 -7.0625q2.3125 -4.484375 2.171875 -10.25q0.140625 -5.78125 -2.171875 -10.3125q-2.296875 -4.546875 -6.34375 -7.140625q-4.03125 -2.609375 -9.234375 -2.609375q-5.1875 0 -9.3125 2.609375q-4.109375 2.59375 -6.421875 7.140625q-2.296875 4.53125 -2.15625 10.3125q-0.140625 5.765625 2.15625 10.25q2.3125 4.46875 6.421875 7.0625q4.125 2.59375 9.3125 2.59375z" fillRule="nonzero"/>
          <path fill="#9fc5e8" d="m493.69894 239.80403l0 -108.34375l21.921906 0l0.875 17.171875l-4.328125 -1.3125q1.0 -4.75 4.890625 -8.640625q3.90625 -3.90625 9.890625 -6.28125q5.984375 -2.390625 12.625 -2.390625q9.8125 0 17.453125 5.125q7.65625 5.125 12.046875 14.0q4.40625 8.875 4.40625 20.5625q0 11.53125 -4.40625 20.484375q-4.390625 8.9375 -12.109375 14.0625q-7.71875 5.125 -17.671875 5.125q-6.5 0 -12.421875 -2.453125q-5.90625 -2.453125 -9.953125 -6.625q-4.03125 -4.1875 -5.3281555 -9.09375l5.3281555 -2.03125l0 50.640625l-23.21878 0zm39.953156 -49.90625q5.203125 0 9.09375 -2.53125q3.890625 -2.53125 6.0625 -7.0q2.171875 -4.46875 2.171875 -10.671875q0 -6.0625 -2.171875 -10.609375q-2.171875 -4.546875 -6.0 -7.0625q-3.8125 -2.53125 -9.15625 -2.53125q-5.328125 0 -9.234375 2.453125q-3.890625 2.453125 -6.0625 7.078125q-2.15625 4.609375 -2.15625 10.671875q0 6.203125 2.15625 10.671875q2.171875 4.46875 6.0625 7.0q3.90625 2.53125 9.234375 2.53125zm83.39374 19.46875q-9.65625 0 -17.234375 -5.125q-7.578125 -5.125 -12.046875 -14.140625q-4.46875 -9.015625 -4.46875 -20.40625q0 -11.6875 4.46875 -20.625q4.46875 -8.953125 12.265625 -14.078125q7.796875 -5.125 17.75 -5.125q5.484375 0 10.015625 1.59375q4.546875 1.578125 8.015625 4.390625q3.46875 2.8125 5.90625 6.5q2.453125 3.671875 3.609375 7.859375l-4.75 -0.578125l0 -18.171875l22.9375 0l0 76.609375l-23.375 0l0 -18.46875l5.1875 -0.140625q-1.15625 4.03125 -3.75 7.640625q-2.59375 3.609375 -6.34375 6.359375q-3.75 2.734375 -8.375 4.328125q-4.609375 1.578125 -9.8125 1.578125zm6.359375 -19.46875q5.328125 0 9.21875 -2.453125q3.90625 -2.453125 6.0625 -7.0q2.171875 -4.546875 2.171875 -10.75q0 -6.203125 -2.171875 -10.75q-2.15625 -4.546875 -6.0625 -7.0625q-3.890625 -2.53125 -9.21875 -2.53125q-5.203125 0 -9.03125 2.53125q-3.8125 2.515625 -5.984375 7.0625q-2.15625 4.546875 -2.15625 10.75q0 6.203125 2.15625 10.75q2.171875 4.546875 5.984375 7.0q3.828125 2.453125 9.03125 2.453125zm68.381165 51.359375l17.46875 -41.125l0.28125 11.828125l-36.9375 -80.5l26.125 0l16.15625 38.515625q1.296875 2.890625 2.453125 6.21875q1.15625 3.3125 1.734375 6.34375l-3.1875 1.875q0.875 -2.171875 1.953125 -5.40625q1.078125 -3.25 2.375 -7.0l14.140625 -40.546875l26.265625 0l-32.609375 76.609375l-13.28125 33.1875l-22.9375 0zm114.855225 -31.75q-12.703125 0 -22.078125 -5.109375q-9.375 -5.125 -14.578125 -14.0q-5.1875 -8.875 -5.1875 -20.28125q0 -8.796875 2.875 -16.15625q2.890625 -7.359375 8.078125 -12.765625q5.203125 -5.40625 12.34375 -8.359375q7.140625 -2.96875 15.65625 -2.96875q8.078125 0 14.78125 2.890625q6.71875 2.890625 11.625 8.078125q4.90625 5.1875 7.5 12.265625q2.59375 7.0625 2.3125 15.4375l-0.140625 6.203125l-61.03125 0l-3.328125 -12.984375l45.59375 0l-2.453125 2.734375l0 -2.875q-0.28125 -3.609375 -2.234375 -6.421875q-1.953125 -2.8125 -5.125 -4.390625q-3.171875 -1.59375 -7.203125 -1.59375q-5.640625 0 -9.609375 2.234375q-3.953125 2.234375 -5.984375 6.5q-2.015625 4.25 -2.015625 10.453125q0 6.34375 2.671875 11.03125q2.671875 4.6875 7.78125 7.296875q5.125 2.59375 12.203125 2.59375q4.90625 0 8.71875 -1.4375q3.828125 -1.453125 8.296875 -4.921875l10.828125 15.296875q-4.46875 3.890625 -9.53125 6.34375q-5.046875 2.453125 -10.3125 3.671875q-5.265625 1.234375 -10.453125 1.234375zm94.78778 -1.4375l-16.296875 -24.671875l-7.5 -10.53125l-30.3125 -41.40625l27.703125 0l15.734375 23.515625l8.21875 11.25l29.875 41.84375l-27.421875 0zm-54.828125 0l30.875 -43.0l12.40625 14.859375l-16.015625 28.140625l-27.265625 0zm50.640625 -33.328125l-12.265625 -14.71875l15.15625 -28.5625l27.265625 0l-30.15625 43.28125z" fillRule="evenodd"/>
          <g filter="url(#shadowFilter-pp.1)">
            <use xlinkHref="#pp.1" transform="matrix(1.0 0.0 0.0 1.0 0.0 2.1642561679790155)"/>
          </g>
          <defs>
            <filter id="shadowFilter-pp.1" filterUnits="userSpaceOnUse">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2.164256" result="blur"/>
              <feComponentTransfer in="blur" colorInterpolationFilters="sRGB">
                <feFuncR type="linear" slope="0" intercept="0.0"/>
                <feFuncG type="linear" slope="0" intercept="0.0"/>
                <feFuncB type="linear" slope="0" intercept="0.0"/>
                <feFuncA type="linear" slope="0.19" intercept="0"/>
              </feComponentTransfer>
            </filter>
          </defs>
          <g id="pp.1">
            <path fill="#3d85c6" d="m175.39804 108.66042c-50.44969 0 -91.34725 30.312737 -91.34725 67.70539q0 33.852707 0 67.7054q45.673622 0 91.34725 0c50.44969 0 91.34726 -30.312744 91.34726 -67.7054c0 -37.392654 -40.897568 -67.70539 -91.34726 -67.70539z" fillRule="evenodd"/>
          </g>
          <g filter="url(#shadowFilter-pp.2)">
            <use xlinkHref="#pp.2" transform="matrix(1.0 0.0 0.0 1.0 0.0 2.1642561679790155)"/>
          </g>
          <defs>
            <filter id="shadowFilter-pp.2" filterUnits="userSpaceOnUse">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2.164256" result="blur"/>
              <feComponentTransfer in="blur" colorInterpolationFilters="sRGB">
                <feFuncR type="linear" slope="0" intercept="0.0"/>
                <feFuncG type="linear" slope="0" intercept="0.0"/>
                <feFuncB type="linear" slope="0" intercept="0.0"/>
                <feFuncA type="linear" slope="0.19" intercept="0"/>
              </feComponentTransfer>
            </filter>
          </defs>
          <g id="pp.2">
            <path fill="#6fa8dc" d="m133.85646 81.83449c-47.876717 19.488663 -78.42317 63.706955 -68.22743 98.7643q9.230515 31.73848 18.46103 63.47696q43.344223 -17.643677 86.688446 -35.287354c47.87671 -19.488663 78.42317 -63.70694 68.22743 -98.7643c-10.19574 -35.05735 -57.272766 -47.67827 -105.149475 -28.189606z" fillRule="evenodd"/>
          </g>
          <g filter="url(#shadowFilter-pp.3)">
            <use xlinkHref="#pp.3" transform="matrix(1.0 0.0 0.0 1.0 0.0 2.1642561679790155)"/>
          </g>
          <defs>
            <filter id="shadowFilter-pp.3" filterUnits="userSpaceOnUse">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2.164256" result="blur"/>
              <feComponentTransfer in="blur" colorInterpolationFilters="sRGB">
                <feFuncR type="linear" slope="0" intercept="0.0"/>
                <feFuncG type="linear" slope="0" intercept="0.0"/>
                <feFuncB type="linear" slope="0" intercept="0.0"/>
                <feFuncA type="linear" slope="0.19" intercept="0"/>
              </feComponentTransfer>
            </filter>
          </defs>
          <g id="pp.3">
            <path fill="#9fc5e8" d="m71.88077 73.475555c-37.007664 39.616753 -49.288628 93.86415 -27.430298 121.16496q19.789001 24.716248 39.578003 49.432495q33.50415 -35.86624 67.0083 -71.73248c37.00766 -39.61676 49.288635 -93.86416 27.430298 -121.16497c-21.858322 -27.30081 -69.578636 -17.316765 -106.5863 22.299995z" fillRule="evenodd"/>
          </g>
        </g>
      </svg>
    </div>
  </div>
);

const QRLinkModal = ({ 
  isOpen, 
  onClose, 
  ticketId, 
  onGoToPay, 
  onCopyLink 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  ticketId: number | null; 
  onGoToPay: (id: number) => void;
  onCopyLink: (id: number) => void;
}) => {
  if (!isOpen || ticketId === null) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <div className="p-8 flex flex-col items-center">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Link de pago</h3>
          
          <div className="bg-white p-4 rounded-2xl border-2 border-gray-50 shadow-inner mb-8">
            <QRCodeSVG 
              value={`https://copayex.com/pay/${ticketId}`} 
              size={200}
              level="H"
              includeMargin={false}
            />
          </div>

          <div className="w-full space-y-3">
            <button 
              onClick={() => onGoToPay(ticketId)}
              className="w-full py-3 bg-[#1a3a5a] text-white font-bold rounded-xl hover:bg-[#152e48] transition-all flex items-center justify-center gap-2"
            >
              Ir a pagar
            </button>
            <button 
              onClick={() => onCopyLink(ticketId)}
              className="w-full py-3 bg-gray-50 text-gray-700 font-bold rounded-xl hover:bg-gray-100 transition-all border border-gray-200 flex items-center justify-center gap-2"
            >
              <Copy size={18} />
              Copiar link
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ActionDropdown = ({ 
  options, 
  onAction 
}: { 
  options: { label: string, icon: any, id: string, variant?: 'default' | 'danger' }[], 
  onAction: (id: string) => void 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <MoreVertical size={18} className="text-gray-400" />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[100] overflow-hidden"
          >
            {options.map((option, index) => (
              <button
                key={option.id}
                onClick={() => {
                  onAction(option.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  option.variant === 'danger' ? 'text-red-600 hover:bg-red-50' : 'text-gray-600 hover:bg-gray-50'
                } ${index !== options.length - 1 ? 'border-b border-gray-50' : ''}`}
              >
                <option.icon size={16} className={option.variant === 'danger' ? 'text-red-400' : 'text-gray-400'} />
                <span>{option.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, label, active, onClick, subItems }: { icon: any, label: string, active?: boolean, onClick?: () => void, subItems?: { label: string, active: boolean, onClick: () => void }[] }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-1">
      <button 
        onClick={() => {
          if (subItems) setIsOpen(!isOpen);
          if (onClick) onClick();
        }}
        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 ${active && !subItems ? 'bg-copayex-light-blue text-copayex-blue font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
      >
        <div className="flex items-center gap-3">
          <Icon size={20} className={active && !subItems ? 'text-copayex-blue' : 'text-gray-400'} />
          <span className="text-sm">{label}</span>
        </div>
        {subItems && (
          <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        )}
      </button>
      
      {subItems && isOpen && (
        <div className="mt-1 ml-4 space-y-1">
          {subItems.map((item, idx) => (
            <button
              key={idx}
              onClick={item.onClick}
              className={`w-full text-left px-8 py-2 text-sm rounded-lg transition-all duration-200 ${item.active ? 'text-copayex-blue font-medium' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Header = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-10">
      <Logo />
    </header>
  );
};

const CreateTicketModal = ({ isOpen, onClose, onCreate }: { isOpen: boolean, onClose: () => void, onCreate: (ticket: Omit<TicketType, 'id' | 'fecha' | 'status' | 'pagado'>) => void }) => {
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('0');
  const [incluirComision, setIncluirComision] = useState(false);
  const [metodosHabilitados, setMetodosHabilitados] = useState<string[]>(['cc', 'dc', 'mp', 'tb']);

  if (!isOpen) return null;

  const calculateFinalAmount = (m: string) => {
    const val = parseFloat(m.replace(/\./g, '').replace(',', '.'));
    if (isNaN(val)) return '0,00';
    const final = val * 1.00484;
    return formatCurrency(final);
  };

  const calculateCommission = (m: string) => {
    const val = parseFloat(m.replace(/\./g, '').replace(',', '.'));
    if (isNaN(val)) return '0,00';
    const commission = val * 0.00484;
    return formatCurrency(commission);
  };

  const handleSubmit = () => {
    const baseAmount = parseFloat(monto.replace(/\./g, '').replace(',', '.'));
    const total = incluirComision ? baseAmount * 1.00484 : baseAmount;
    onCreate({
      titulo: '',
      descripcion,
      total: isNaN(total) ? 0 : total,
      metodosPagoHabilitados: metodosHabilitados
    });
    onClose();
    // Reset form
    setDescripcion('');
    setMonto('0');
    setIncluirComision(false);
    setMetodosHabilitados(['cc', 'dc', 'mp', 'tb']);
  };

  const toggleMetodo = (id: string) => {
    if (metodosHabilitados.includes(id)) {
      setMetodosHabilitados(metodosHabilitados.filter(m => m !== id));
    } else {
      setMetodosHabilitados([...metodosHabilitados, id]);
    }
  };

  const handleMontoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const lastChar = value.slice(-1);
    
    if (!value) {
      setMonto('0');
      return;
    }

    let isDecimalMode = value.includes(',');
    const separatorJustAdded = !monto.includes(',') && (lastChar === ',' || lastChar === '.');
    
    if (separatorJustAdded) isDecimalMode = true;
    if (monto.includes(',') && !value.includes(',')) isDecimalMode = false;

    let integerPart = '';
    let decimalPart = '';

    if (isDecimalMode) {
      let workingValue = value;
      if (separatorJustAdded && lastChar === '.') {
        workingValue = value.slice(0, -1) + ',';
      }
      const parts = workingValue.split(',');
      integerPart = parts[0].replace(/\D/g, '');
      decimalPart = parts[1] ? parts[1].replace(/\D/g, '').slice(0, 2) : '';
    } else {
      integerPart = value.replace(/\D/g, '');
    }

    if (integerPart !== '') {
      try {
        integerPart = BigInt(integerPart).toString();
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      } catch (err) {
        integerPart = '0';
      }
    } else {
      integerPart = '0';
    }

    let finalValue = integerPart;
    if (isDecimalMode) {
      finalValue += ',' + decimalPart;
    }
    
    setMonto(finalValue);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Crear ticket</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-400" />
          </button>
        </div>
        
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Descripción</label>
            <textarea 
              rows={3}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-copayex-blue/20 focus:border-copayex-blue outline-none transition-all resize-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Monto</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
              <input 
                type="text" 
                value={monto}
                onChange={handleMontoChange}
                onFocus={(e) => e.target.select()}
                className="w-full pl-8 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-copayex-blue/20 focus:border-copayex-blue outline-none transition-all text-left font-mono font-bold"
              />
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Incluir tarifa de copayex</span>
              <button 
                onClick={() => setIncluirComision(!incluirComision)}
                className={`w-8 h-4 rounded-full transition-all duration-200 relative ${incluirComision ? 'bg-copayex-blue' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all duration-200 ${incluirComision ? 'left-[17px]' : 'left-0.5'}`} />
              </button>
            </div>
            {incluirComision && (
              <div className="mt-1 space-y-0.5">
                <p className="text-[12.6px] font-medium text-gray-500">
                  Tarifa (0,4% + IVA): ${calculateCommission(monto)}
                </p>
                <p className="text-sm font-medium text-gray-700">
                  Monto final: ${calculateFinalAmount(monto)}
                </p>
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Métodos de pago</label>
            <div className="space-y-3">
              {[
                { id: 'cc', label: 'Tarjeta de Crédito', icon: CreditCard },
                { id: 'dc', label: 'Tarjeta de Débito', icon: CreditCard },
                { id: 'mp', label: 'Mercado Pago', icon: Wallet },
                { id: 'tb', label: 'Transferencia Bancaria', icon: Building2 },
              ].map(method => (
                <label key={method.id} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      checked={metodosHabilitados.includes(method.id)} 
                      onChange={() => toggleMetodo(method.id)}
                      className="peer sr-only" 
                    />
                    <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-copayex-blue peer-checked:border-copayex-blue transition-all"></div>
                    <Check size={14} className="absolute inset-0 m-auto text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex items-center gap-2">
                    <method.icon size={18} className="text-gray-400" />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">{method.label}</span>
                  </div>
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3">Seleccioná los métodos disponibles para este ticket.</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">QR asociado</label>
            <div className="relative">
              <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-copayex-blue/20 focus:border-copayex-blue outline-none appearance-none transition-all text-gray-400">
                <option>QR asociado (opcional)</option>
              </select>
              <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-100">
          <button 
            onClick={handleSubmit}
            className="w-full py-3 bg-slate-400 hover:bg-slate-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-slate-200"
          >
            Crear ticket
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const PagoPantalla = ({ 
  ticket, 
  pagos,
  businessLogo,
  businessName,
  onBack, 
  onPaymentComplete 
}: { 
  ticket: TicketType; 
  pagos: PagoRecibido[];
  businessLogo: string | null;
  businessName: string;
  onBack: () => void;
  onPaymentComplete: (amount: number, name: string, method: string) => void;
}) => {
  const [step, setStep] = useState<'name' | 'dashboard' | 'method' | 'card' | 'bank'>('name');
  const [userName, setUserName] = useState('');
  const [amountToPay, setAmountToPay] = useState('0');
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
  const optionsMenuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsMenuRef.current && !optionsMenuRef.current.contains(event.target as Node)) {
        setIsOptionsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMontoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const lastChar = value.slice(-1);
    
    if (!value) {
      setAmountToPay('0');
      return;
    }

    let isDecimalMode = value.includes(',');
    const separatorJustAdded = !amountToPay.includes(',') && (lastChar === ',' || lastChar === '.');
    
    if (separatorJustAdded) isDecimalMode = true;
    if (amountToPay.includes(',') && !value.includes(',')) isDecimalMode = false;

    let integerPart = '';
    let decimalPart = '';

    if (isDecimalMode) {
      let workingValue = value;
      if (separatorJustAdded && lastChar === '.') {
        workingValue = value.slice(0, -1) + ',';
      }
      const parts = workingValue.split(',');
      integerPart = parts[0].replace(/\D/g, '');
      decimalPart = parts[1] ? parts[1].replace(/\D/g, '').slice(0, 2) : '';
    } else {
      integerPart = value.replace(/\D/g, '');
    }

    if (integerPart !== '') {
      try {
        integerPart = BigInt(integerPart).toString();
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      } catch (err) {
        integerPart = '0';
      }
    } else {
      integerPart = '0';
    }

    let finalValue = integerPart;
    if (isDecimalMode) {
      finalValue += ',' + decimalPart;
    }
    
    setAmountToPay(finalValue);
  };

  const getNumericAmount = (m: string) => {
    const val = parseFloat(m.replace(/\./g, '').replace(',', '.'));
    return isNaN(val) ? 0 : val;
  };

  const relevantPagos = pagos.filter(p => p.ticketId === ticket.id);
  const totalPagado = relevantPagos.filter(p => p.status !== 'reembolsado').reduce((acc, p) => acc + p.monto, 0);
  const restaPagar = ticket.total - totalPagado;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-50/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <button 
        onClick={onBack}
        className="fixed top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors font-bold z-[110]"
      >
        <ChevronLeft size={24} />
        <span>Volver</span>
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`h-[97vh] aspect-[9/18] bg-copayex-blue rounded-2xl shadow-2xl flex flex-col relative ${['name', 'method', 'card', 'bank'].includes(step) ? 'overflow-hidden' : 'overflow-y-auto'}`}
      >
        {/* Content wrapper with conditional blur */}
        <div className={`flex flex-col h-full transition-all duration-300 ${step === 'name' ? 'blur-md pointer-events-none' : ''}`}>
          {/* Header */}
          <div className="p-4 shrink-0 flex flex-col items-center relative">
            <div className="absolute top-4 left-4">
              <LogoPayment className="h-[25px]" />
            </div>

            <div className="absolute top-4 right-4" ref={optionsMenuRef}>
              <button 
                onClick={() => setIsOptionsMenuOpen(!isOptionsMenuOpen)}
                className="p-1.5 text-white/60 hover:text-white transition-colors rounded-full hover:bg-white/10"
              >
                <MoreVertical size={20} />
              </button>
              
              <AnimatePresence>
                {isOptionsMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-[200] overflow-hidden"
                  >
                    <button
                      onClick={() => setIsOptionsMenuOpen(false)}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-bold"
                    >
                      Reclamar
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              onClick={() => setStep('name')} 
              className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors mt-8 mb-6"
            >
              <span className="font-bold text-sm">Hola {userName || 'Usuario'}!</span>
              <Pencil size={14} />
            </button>

            <div className="flex items-center justify-center gap-4 text-left mb-12">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center overflow-hidden shrink-0 border-2 border-white/10">
                {businessLogo ? (
                  <img src={businessLogo} alt="Business" className="w-full h-full object-cover" />
                ) : (
                  <Building2 size={32} className="text-white" />
                )}
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-bold text-white leading-tight mb-1">{ticket.titulo || businessName}</h2>
                <p className="text-white/60 text-sm">{ticket.descripcion}</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-slate-50 rounded-t-2xl p-3 space-y-3 -mt-4 pb-16">
            {/* Summary Card */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="text-center mb-4">
                <p className="text-gray-400 font-bold mb-0.5 text-xs">Total</p>
                <p className="text-xl font-bold text-gray-900">$ {formatCurrency(ticket.total)}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center border-r border-gray-100">
                  <p className="text-gray-400 font-bold mb-0.5 text-xs">Pagado</p>
                  <p className="text-base font-bold text-green-600">$ {formatCurrency(totalPagado)}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 font-bold mb-0.5 text-xs">Resta pagar</p>
                  <p className="text-base font-bold text-red-500">$ {formatCurrency(restaPagar)}</p>
                </div>
              </div>
            </div>

            {/* Payment Input Card */}
            {ticket.status === 'finalizado' ? (
              ticket.finalizadoManualmente ? (
                <div className="bg-[#fef9c3] rounded-lg p-6 shadow-sm border border-yellow-200 text-center flex flex-col items-center justify-center space-y-4">
                  <p className="text-yellow-800 font-bold text-lg leading-tight">
                    Este ticket se encuentra finalizado
                  </p>
                  <button 
                    onClick={onBack}
                    className="px-4 py-1.5 bg-yellow-800/10 hover:bg-yellow-800/20 text-yellow-800 text-xs font-bold rounded-full transition-all border border-yellow-800/20"
                  >
                    volver al sitio
                  </button>
                </div>
              ) : (
                <div className="bg-[#dcfce7] rounded-lg p-6 shadow-sm border border-green-200 text-center flex flex-col items-center justify-center space-y-4">
                  <p className="text-green-800 font-bold text-lg leading-tight">
                    ¡El pago total se completó exitosamente!
                  </p>
                  <button 
                    onClick={onBack}
                    className="px-4 py-1.5 bg-green-800/10 hover:bg-green-800/20 text-green-800 text-xs font-bold rounded-full transition-all border border-green-800/20"
                  >
                    volver al sitio
                  </button>
                </div>
              )
            ) : (
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="relative flex items-center justify-center mb-4">
                  <span className="absolute left-0 text-xl font-bold text-gray-400">$</span>
                  <input 
                    type="text"
                    value={amountToPay === '0' ? '' : amountToPay}
                    onChange={handleMontoChange}
                    placeholder="0"
                    className="w-full text-center text-3xl font-bold text-gray-900 outline-none placeholder:text-gray-200"
                  />
                </div>
                <button 
                  onClick={() => getNumericAmount(amountToPay) > 0 && setStep('method')}
                  disabled={getNumericAmount(amountToPay) > restaPagar || getNumericAmount(amountToPay) <= 0}
                  className="w-full py-3 bg-[#1a3a5a] text-white font-bold rounded-lg hover:bg-[#152e48] transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Pagar
                </button>
              </div>
            )}

            {/* Activity Card */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-3 text-sm">Actividad</h3>
              <div className="space-y-3">
                {relevantPagos.length > 0 ? (
                  relevantPagos.map(pago => (
                    <div key={pago.id} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                      <div className="flex items-center gap-2">
                        <p className={`font-bold text-sm ${pago.status === 'reembolsado' ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                          {pago.descripcion.split(' ')[0] || 'Usuario'}
                        </p>
                        {pago.status === 'reembolsado' && (
                          <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 text-[8px] font-bold rounded uppercase">Devuelto</span>
                        )}
                      </div>
                      <div className="text-right">
                        <p className={`font-bold text-sm ${pago.status === 'reembolsado' ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                          $ {formatCurrency(pago.monto)}
                        </p>
                        <p className="text-[9px] text-gray-400">{pago.status === 'reembolsado' ? 'Reembolsado' : pago.fecha}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400 text-center py-3">No hay pagos registrados aún.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Name Input Modal */}
        <AnimatePresence>
          {step === 'name' && (
            <div className="absolute inset-0 z-[150] flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="w-full bg-white rounded-2xl p-6 shadow-2xl relative z-10"
              >
                <h2 className="text-lg font-bold text-center text-gray-900 mb-1">¡Hola!</h2>
                <p className="text-sm font-bold text-center text-gray-900 mb-6">Por favor, ingresá tu nombre</p>
                
                <div className="space-y-4">
                  <input 
                    type="text"
                    placeholder="Ingresa tu nombre"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    autoFocus
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-copayex-blue/20 focus:border-copayex-blue outline-none transition-all text-base"
                  />
                  
                  <button 
                    onClick={() => userName && setStep('dashboard')}
                    disabled={!userName}
                    className="w-full py-3 bg-[#1a3a5a] text-white font-bold rounded-lg hover:bg-[#152e48] transition-all disabled:opacity-50 text-sm"
                  >
                    Continuar
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Method Selection Modal */}
        <AnimatePresence>
          {step === 'method' && (
            <div 
              className="absolute inset-0 z-[120] flex items-end justify-center bg-black/40 backdrop-blur-sm"
              onClick={() => setStep('dashboard')}
            >
              <motion.div 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                className="bg-white w-full rounded-t-2xl p-4 pb-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-8" />
                  <p className="text-xl font-bold text-gray-900">$ {amountToPay}</p>
                  <button onClick={() => setStep('dashboard')} className="p-1.5 hover:bg-gray-100 rounded-full">
                    <X size={18} className="text-gray-400" />
                  </button>
                </div>
                
                <div className="space-y-0">
                  {[
                    { id: 'mp', label: 'Mercado Pago', icon: Wallet },
                    { id: 'dc', label: 'Tarjeta de débito', icon: CreditCard },
                    { id: 'cc', label: 'Tarjeta de crédito', icon: CreditCard },
                    { id: 'tb', label: 'Transferencia Bancaria', icon: Building2 },
                  ].filter(method => ticket.metodosPagoHabilitados.includes(method.id)).map(method => (
                    <button 
                      key={method.id}
                      onClick={() => {
                        setSelectedMethod(method.id);
                        setStep(method.id === 'tb' ? 'bank' : 'card');
                      }}
                      className="w-full flex items-center gap-2.5 p-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                    >
                      <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                        <method.icon size={18} className="text-gray-900" />
                      </div>
                      <span className="text-base font-bold text-gray-900">{method.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Bank Details Modal */}
        <AnimatePresence>
          {step === 'bank' && (
            <div 
              className="absolute inset-0 z-[130] flex items-end justify-center bg-black/40 backdrop-blur-sm"
              onClick={() => setStep('dashboard')}
            >
              <motion.div 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                className="bg-white w-full rounded-t-2xl p-4 pb-4 max-h-[95%] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="overflow-y-auto mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <button onClick={() => setStep('method')} className="p-1.5 hover:bg-gray-100 rounded-full">
                      <ChevronLeft size={18} className="text-gray-400" />
                    </button>
                    <p className="text-xl font-bold text-gray-900">$ {amountToPay}</p>
                    <button onClick={() => setStep('dashboard')} className="p-1.5 hover:bg-gray-100 rounded-full">
                      <X size={18} className="text-gray-400" />
                    </button>
                  </div>

                  <p className="text-base font-medium text-gray-900 mb-4">Por favor, realice la transferencia a la siguiente cuenta:</p>

                  <div className="space-y-3">
                    <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                      <p className="text-gray-400 font-bold mb-3 uppercase text-[10px] tracking-wider">Titular</p>
                      <p className="text-base font-bold text-gray-900 mb-4 uppercase">José Fernandez</p>
                      <p className="text-gray-400 font-bold mb-3 uppercase text-[10px] tracking-wider">CUIT</p>
                      <p className="text-base font-bold text-gray-900">20123456780</p>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 font-bold mb-3 uppercase text-[10px] tracking-wider">Alias</p>
                        <p className="text-base font-bold text-gray-900">cpyx.1234.talo</p>
                      </div>
                      <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
                        <Copy size={16} />
                      </button>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 font-bold mb-3 uppercase text-[10px] tracking-wider">CVU</p>
                        <p className="text-base font-bold text-gray-900 break-all">0000123400000000123456</p>
                      </div>
                      <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                  <button 
                    onClick={() => {
                      onPaymentComplete(getNumericAmount(amountToPay), userName, 'tb');
                      setStep('dashboard');
                      setAmountToPay('0');
                    }}
                    disabled={getNumericAmount(amountToPay) > restaPagar}
                    className="w-full py-3 bg-[#1a3a5a] text-white font-bold rounded-lg hover:bg-[#152e48] transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Ya realice la transferencia
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Card Details Modal */}
        <AnimatePresence>
          {step === 'card' && (
            <div 
              className="absolute inset-0 z-[130] flex items-end justify-center bg-black/40 backdrop-blur-sm"
              onClick={() => setStep('dashboard')}
            >
              <motion.div 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                className="bg-white w-full rounded-t-2xl p-4 pb-4 max-h-[95%] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="overflow-y-auto mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <button onClick={() => setStep('method')} className="p-1.5 hover:bg-gray-100 rounded-full">
                      <ChevronLeft size={18} className="text-gray-400" />
                    </button>
                    <p className="text-xl font-bold text-gray-900">$ {amountToPay}</p>
                    <button onClick={() => setStep('dashboard')} className="p-1.5 hover:bg-gray-100 rounded-full">
                      <X size={18} className="text-gray-400" />
                    </button>
                  </div>

                  {selectedMethod === 'mp' ? (
                    <div className="flex flex-col items-center justify-center py-12 space-y-8">
                      <p className="text-base font-bold text-gray-900 text-center px-4">
                        Serás redirigido a la aplicación de Mercado Pago
                      </p>
                      <div className="w-32 h-32 flex items-center justify-center">
                        <img 
                          src="/logo_mercado_pago.png" 
                          alt="Mercado Pago" 
                          className="w-full h-auto object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-900 mb-1.5">Número de tarjeta</label>
                        <input type="text" placeholder="1234 1234 1234 1234" className="w-full px-3 py-3 bg-white border border-gray-200 rounded-lg outline-none focus:border-copayex-blue transition-colors text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-900 mb-1.5">Nombre del titular</label>
                        <input type="text" placeholder="Ej.: María López" className="w-full px-3 py-3 bg-white border border-gray-200 rounded-lg outline-none focus:border-copayex-blue transition-colors text-sm" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-gray-900 mb-1.5">Vencimiento</label>
                          <input type="text" placeholder="MM/AA" className="w-full px-3 py-3 bg-white border border-gray-200 rounded-lg outline-none focus:border-copayex-blue transition-colors text-sm" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-900 mb-1.5">Código de seguridad</label>
                          <input type="text" placeholder="123" className="w-full px-3 py-3 bg-white border border-gray-200 rounded-lg outline-none focus:border-copayex-blue transition-colors text-sm" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-900 mb-1.5">Documento del titular</label>
                        <input type="text" placeholder="99.999.999" className="w-full px-3 py-3 bg-white border border-gray-200 rounded-lg outline-none focus:border-copayex-blue transition-colors text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-900 mb-1.5">Correo Electronico</label>
                        <input type="email" placeholder="juanperes@mail.com" className="w-full px-3 py-3 bg-white border border-gray-200 rounded-lg outline-none focus:border-copayex-blue transition-colors text-sm" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-auto">
                  <button 
                    onClick={() => {
                      onPaymentComplete(getNumericAmount(amountToPay), userName, selectedMethod!);
                      setStep('dashboard');
                      setAmountToPay('0');
                    }}
                    disabled={getNumericAmount(amountToPay) > restaPagar}
                    className="w-full py-3 bg-[#1a3a5a] text-white font-bold rounded-lg hover:bg-[#152e48] transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Pagar
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const LoginView = ({ onLogin }: { onLogin: () => void }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-100"
      >
        <div className="flex flex-col items-center mb-10">
          <svg 
            version="1.1" 
            viewBox="0.0 0.0 960.0 720.0" 
            fill="none" 
            stroke="none" 
            strokeLinecap="square" 
            strokeMiterlimit="10" 
            xmlnsXlink="http://www.w3.org/1999/xlink" 
            xmlns="http://www.w3.org/2000/svg"
            className="h-32 w-auto"
          >
            <clipPath id="p.0">
              <path d="m0 0l960.0 0l0 720.0l-960.0 0l0 -720.0z" clipRule="nonzero"/>
            </clipPath>
            <g clipPath="url(#p.0)">
              <path fill="#000000" fillOpacity="0.0" d="m0 0l960.0 0l0 720.0l-960.0 0z" fillRule="evenodd"/>
              <g filter="url(#shadowFilter-p.1)">
                <use xlinkHref="#p.1" transform="matrix(1.0 0.0 0.0 1.0 0.0 9.720113385826751)"/>
              </g>
              <defs>
                <filter id="shadowFilter-p.1" filterUnits="userSpaceOnUse">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="9.720114" result="blur"/>
                  <feComponentTransfer in="blur" colorInterpolationFilters="sRGB">
                    <feFuncR type="linear" slope="0" intercept="0.0"/>
                    <feFuncG type="linear" slope="0" intercept="0.0"/>
                    <feFuncB type="linear" slope="0" intercept="0.0"/>
                    <feFuncA type="linear" slope="0.28" intercept="0"/>
                  </feComponentTransfer>
                </filter>
              </defs>
              <g id="p.1">
                <path fill="#6fa8dc" d="m543.2179 182.45258c-90.85248 0 -164.50299 53.816605 -164.50299 120.20276q0 60.10138 0 120.20276q82.251495 0 164.50299 0c90.85254 0 164.50305 -53.81662 164.50305 -120.20276c0 -66.386154 -73.65051 -120.20276 -164.50305 -120.20276z" fillRule="evenodd"/>
              </g>
              <g filter="url(#shadowFilter-p.2)">
                <use xlinkHref="#p.2" transform="matrix(1.0 0.0 0.0 1.0 0.0 9.720113385826751)"/>
              </g>
              <defs>
                <filter id="shadowFilter-p.2" filterUnits="userSpaceOnUse">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="9.720114" result="blur"/>
                  <feComponentTransfer in="blur" colorInterpolationFilters="sRGB">
                    <feFuncR type="linear" slope="0" intercept="0.0"/>
                    <feFuncG type="linear" slope="0" intercept="0.0"/>
                    <feFuncB type="linear" slope="0" intercept="0.0"/>
                    <feFuncA type="linear" slope="0.28" intercept="0"/>
                  </feComponentTransfer>
                </filter>
              </defs>
              <g id="p.2">
                <path fill="#3d85c6" d="m468.4076 134.82637c-86.21893 34.599762 -141.22864 113.10399 -122.867584 175.3441q16.622803 56.34784 33.245605 112.69565q78.05661 -31.324188 156.11319 -62.648407c86.21893 -34.599792 141.22864 -113.104004 122.867615 -175.3441c-18.361023 -62.240097 -103.13989 -84.64702 -189.35883 -50.04724z" fillRule="evenodd"/>
              </g>
              <g filter="url(#shadowFilter-p.3)">
                <use xlinkHref="#p.3" transform="matrix(1.0 0.0 0.0 1.0 0.0 9.720113385826751)"/>
              </g>
              <defs>
                <filter id="shadowFilter-p.3" filterUnits="userSpaceOnUse">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="9.720114" result="blur"/>
                  <feComponentTransfer in="blur" colorInterpolationFilters="sRGB">
                    <feFuncR type="linear" slope="0" intercept="0.0"/>
                    <feFuncG type="linear" slope="0" intercept="0.0"/>
                    <feFuncB type="linear" slope="0" intercept="0.0"/>
                    <feFuncA type="linear" slope="0.28" intercept="0"/>
                  </feComponentTransfer>
                </filter>
              </defs>
              <g id="p.3">
                <path fill="#0b5394" d="m356.79846 119.986084c-66.645386 70.33476 -88.7616 166.64447 -49.39795 215.11377q35.637085 43.880707 71.2742 87.76141q60.33606 -63.676178 120.67215 -127.352356c66.645386 -70.33476 88.7616 -166.64449 49.39795 -215.11377c-39.363647 -48.46929 -125.300964 -30.74382 -191.94635 39.59095z" fillRule="evenodd"/>
              </g>
              <path fill="#000000" fillOpacity="0.0" d="m10.391317 382.80222l939.21265 0l0 329.85825l-939.21265 0z" fillRule="evenodd"/>
              <path fill="#3d85c6" d="m122.0266 617.3658q-14.96875 0 -26.828125 -6.984375q-11.859375 -7.0 -18.765625 -19.140625q-6.890625 -12.15625 -6.890625 -27.515625q0 -15.359375 6.890625 -27.5q6.90625 -12.15625 18.765625 -19.15625q11.859375 -7.0000305 26.828125 -7.0000305q13.796867 0 25.359367 4.8594055q11.578125 4.859375 18.375 13.609375l-16.90625 20.21875q-2.71875 -3.109375 -6.421875 -5.828125q-3.6875 -2.734375 -8.15625 -4.28125q-4.46875 -1.5625 -9.328117 -1.5625q-7.390625 0 -13.03125 3.40625q-5.640625 3.40625 -8.75 9.4375q-3.109375 6.015625 -3.109375 13.796875q0 7.375 3.203125 13.40625q3.21875 6.03125 8.84375 9.53125q5.640625 3.5 12.84375 3.5q5.0468674 0 9.328117 -1.265625q4.28125 -1.265625 7.875 -3.796875q3.59375 -2.53125 6.703125 -6.21875l16.71875 20.40625q-6.609375 8.359375 -18.375 13.21875q-11.765625 4.859375 -25.171867 4.859375zm109.25533 0q-16.140625 0 -28.6875 -6.984375q-12.53125 -7.0 -19.828125 -19.046875q-7.28125 -12.0625 -7.28125 -27.609375q0 -15.5625 7.28125 -27.609375q7.296875 -12.046875 19.828125 -19.046875q12.546875 -7.0000305 28.6875 -7.0000305q16.125 0 28.656265 7.0000305q12.546875 7.0 19.734375 19.046875q7.203125 12.046875 7.203125 27.609375q0 15.546875 -7.203125 27.609375q-7.1875 12.046875 -19.734375 19.046875q-12.531265 6.984375 -28.656265 6.984375zm0 -26.8125q6.984375 0 12.421875 -3.5q5.453125 -3.5 8.5625 -9.53125q3.109375 -6.03125 2.921875 -13.796875q0.1875 -7.78125 -2.921875 -13.90625q-3.109375 -6.125 -8.5625 -9.625q-5.4375 -3.5 -12.421875 -3.5q-7.0 0 -12.546875 3.5q-5.53125 3.5 -8.65625 9.625q-3.109375 6.125 -2.90625 13.90625q-0.203125 7.765625 2.90625 13.796875q3.125 6.03125 8.65625 9.53125q5.546875 3.5 12.546875 3.5z" fillRule="nonzero"/>
              <path fill="#073763" d="m307.27692 658.19385l0 -145.98431l29.546875 0l1.171875 23.125l-5.828125 -1.75q1.359375 -6.40625 6.609375 -11.65625q5.25 -5.25 13.3125 -8.453125q8.0625 -3.2187805 17.015625 -3.2187805q13.21875 0 23.515625 6.9062805q10.296875 6.90625 16.21875 18.859375q5.9375 11.953125 5.9375 27.703125q0 15.546875 -5.9375 27.609375q-5.921875 12.046875 -16.328125 18.953125q-10.390625 6.890625 -23.796875 6.890625q-8.75 0 -16.71875 -3.296875q-7.96875 -3.3125 -13.421875 -8.953125q-5.4375 -5.640625 -7.1875 -12.25l7.1875 -2.71875l0 68.234314l-31.296875 0zm53.84375 -67.265564q7.0 0 12.25 -3.390625q5.25 -3.40625 8.15625 -9.421875q2.921875 -6.03125 2.921875 -14.390625q0 -8.171875 -2.921875 -14.296875q-2.90625 -6.125 -8.0625 -9.515625q-5.140625 -3.40625 -12.34375 -3.40625q-7.1875 0 -12.4375 3.3125q-5.25 3.296875 -8.171875 9.515625q-2.90625 6.21875 -2.90625 14.390625q0 8.359375 2.90625 14.390625q2.921875 6.015625 8.171875 9.421875q5.25 3.390625 12.4375 3.390625zm112.36899 26.25q-13.03125 0 -23.234375 -6.890625q-10.203125 -6.90625 -16.234375 -19.046875q-6.015625 -12.15625 -6.015625 -27.515625q0 -15.75 6.015625 -27.796875q6.03125 -12.0625 16.53125 -18.953125q10.5 -6.9062805 23.90625 -6.9062805q7.390625 0 13.5 2.1406555q6.125 2.140625 10.796875 5.9375q4.671875 3.78125 7.96875 8.734375q3.3125 4.953125 4.859375 10.59375l-6.40625 -0.78125l0 -24.484375l30.90622 0l0 103.21875l-31.49997 0l0 -24.875l7.0 -0.203125q-1.546875 5.4375 -5.046875 10.3125q-3.5 4.859375 -8.5625 8.546875q-5.046875 3.6875 -11.265625 5.828125q-6.21875 2.140625 -13.21875 2.140625zm8.546875 -26.25q7.1875 0 12.4375 -3.296875q5.25 -3.3125 8.171875 -9.421875q2.921875 -6.125 2.921875 -14.484375q0 -8.359375 -2.921875 -14.484375q-2.921875 -6.125 -8.171875 -9.515625q-5.25 -3.40625 -12.4375 -3.40625q-7.0 0 -12.15625 3.40625q-5.140625 3.390625 -8.0625 9.515625q-2.90625 6.125 -2.90625 14.484375q0 8.359375 2.90625 14.484375q2.921875 6.109375 8.0625 9.421875q5.15625 3.296875 12.15625 3.296875zm92.14554 69.203064l23.515625 -55.390564l0.390625 15.9375l-49.765625 -108.46875l35.1875 0l21.765625 51.90625q1.75 3.875 3.296875 8.359375q1.5625 4.46875 2.34375 8.546875l-4.265625 2.53125q1.15625 -2.921875 2.609375 -7.296875q1.46875 -4.375 3.21875 -9.421875l19.046875 -54.625l35.375 0l-43.921875 103.21875l-17.890625 44.703064l-30.90625 0zm154.73438 -42.765564q-17.109375 0 -29.75 -6.890625q-12.625 -6.90625 -19.625 -18.859375q-7.0 -11.953125 -7.0 -27.3125q0 -11.859375 3.890625 -21.765625q3.890625 -9.921875 10.875 -17.203125q7.0 -7.296875 16.625 -11.28125q9.625 -3.9844055 21.09375 -3.9844055q10.890625 0 19.921875 3.8906555q9.046875 3.890625 15.65625 10.890625q6.609375 6.984375 10.109375 16.515625q3.5 9.53125 3.109375 20.796875l-0.203125 8.359375l-82.21875 0l-4.46875 -17.5l61.421875 0l-3.3125 3.703125l0 -3.890625q-0.375 -4.859375 -3.0 -8.640625q-2.625 -3.796875 -6.90625 -5.9375q-4.28125 -2.140625 -9.71875 -2.140625q-7.578125 0 -12.9375 3.015625q-5.34375 3.015625 -8.0625 8.75q-2.71875 5.734375 -2.71875 14.09375q0 8.546875 3.59375 14.875q3.59375 6.3125 10.5 9.8125q6.90625 3.5 16.421875 3.5q6.609375 0 11.765625 -1.9375q5.15625 -1.953125 11.171875 -6.625l14.578125 20.609375q-6.015625 5.25 -12.828125 8.5625q-6.796875 3.296875 -13.890625 4.9375q-7.09375 1.65625 -14.09375 1.65625zm127.720215 -1.9375l-21.96875 -33.234375l-10.109375 -14.203125l-40.828125 -55.78125l37.328125 0l21.1875 31.6875l11.078125 15.15625l40.234375 56.375l-36.921875 0zm-73.875 0l41.59375 -57.921875l16.71875 20.015625l-21.578125 37.90625l-36.734375 0zm68.234375 -44.90625l-16.53125 -19.828125l20.421875 -38.484375l36.734375 0l-40.625 58.3125z" fillRule="nonzero"/>
            </g>
          </svg>
        </div>
        
        <button 
          onClick={onLogin}
          className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all mb-6"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          <span className="text-gray-600 font-medium">Continuar con Google</span>
        </button>
        
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-400">o</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <div className="relative">
              <input 
                type="email" 
                placeholder="nombre@mail.com"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-copayex-blue/20 focus:border-copayex-blue outline-none transition-all"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Contraseña</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="********"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-copayex-blue/20 focus:border-copayex-blue outline-none transition-all"
              />
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <button 
            onClick={onLogin}
            className="w-full py-3.5 bg-copayex-blue hover:bg-blue-900 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20"
          >
            Ingresar
          </button>
        </div>
        
        <div className="mt-8 text-center space-y-4">
          <button className="text-sm text-blue-600 hover:underline font-medium">
            ¿Olvidaste tu contraseña?
          </button>
          <div className="border-t border-gray-100 pt-4">
            <button className="text-sm text-gray-600 hover:text-gray-900 font-medium">
              Crear cuenta
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [businessName, setBusinessName] = useState('maxStore');
  const [isEditingName, setIsEditingName] = useState(false);
  const [currentView, setCurrentView] = useState<View>('tickets');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'activo' | 'finalizado' | 'anulado'>('activo');
  const [tickets, setTickets] = useState<TicketType[]>(MOCK_TICKETS);
  const [pagos, setPagos] = useState<PagoRecibido[]>(MOCK_PAGOS);
  const [qrs, setQrs] = useState<QRCode[]>(MOCK_QRS);
  const [businessLogo, setBusinessLogo] = useState<string | null>(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [pagoFilter, setPagoFilter] = useState<'aprobado' | 'reembolsado'>('aprobado');

  // Automatic ticket status update based on payments
  React.useEffect(() => {
    setTickets(prevTickets => prevTickets.map(ticket => {
      const ticketPagos = pagos.filter(p => p.ticketId === ticket.id && p.status !== 'reembolsado');
      const totalPagado = ticketPagos.reduce((acc, p) => acc + p.monto, 0);
      const restaPagar = ticket.total - totalPagado;

      let newStatus = ticket.status;
      if (ticket.status !== 'anulado' && !ticket.finalizadoManualmente) {
        if (restaPagar <= 0 && ticket.status !== 'finalizado') {
          newStatus = 'finalizado';
        } else if (restaPagar > 0 && ticket.status === 'finalizado') {
          newStatus = 'activo';
        }
      }

      // Only return a new object if something actually changed to avoid unnecessary re-renders
      if (ticket.pagado === totalPagado && ticket.status === newStatus) {
        return ticket;
      }

      return { ...ticket, pagado: totalPagado, status: newStatus };
    }));
  }, [pagos]);
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [configTab, setConfigTab] = useState<'cuenta' | 'metodos' | 'integraciones'>('cuenta');
  const [selectedMetodo, setSelectedMetodo] = useState<MetodoPago | null>(null);
  const [isCreateIntegrationModalOpen, setIsCreateIntegrationModalOpen] = useState(false);
  const [isCreateWebhookModalOpen, setIsCreateWebhookModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [qrModalTicketId, setQrModalTicketId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string; action?: { label: string; onClick: () => void } } | null>(null);
  const profileMenuRef = React.useRef<HTMLDivElement>(null);

  const showNotification = (message: string, action?: { label: string; onClick: () => void }) => {
    setToast({ message, action });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBusinessLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateTicket = (newTicketData: Omit<TicketType, 'id' | 'fecha' | 'status' | 'pagado'>) => {
    const now = new Date();
    const fechaStr = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear().toString().slice(-2)}, ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const newTicket: TicketType = {
      ...newTicketData,
      id: tickets.length > 0 ? Math.max(...tickets.map(c => c.id)) + 1 : 1,
      fecha: fechaStr,
      status: 'activo',
      pagado: 0
    };
    
    setTickets([newTicket, ...tickets]);
    setActiveTab('activo');
  };

  const handleTicketAction = (ticketId: number, actionId: string) => {
    if (actionId === 'finalizado') {
      setTickets(tickets.map(c => c.id === ticketId ? { ...c, status: 'finalizado', finalizadoManualmente: true } : c));
    } else if (actionId === 'anulado') {
      setTickets(tickets.map(c => c.id === ticketId ? { ...c, status: 'anulado' } : c));
    } else if (actionId === 'copiar') {
      setQrModalTicketId(ticketId);
      setIsQRModalOpen(true);
    } else if (actionId === 'vincular') {
      console.log('Vinculando a QR ticket', ticketId);
    }
  };

  const handlePagoAction = (pagoId: number, actionId: string) => {
    if (actionId === 'devolver') {
      setPagos(pagos.map(p => p.id === pagoId ? { ...p, status: 'reembolsado' } : p));
      console.log('Pago reembolsado', pagoId);
    } else if (actionId === 'ir-al-ticket') {
      const pago = pagos.find(p => p.id === pagoId);
      if (pago) {
        setSelectedTicketId(pago.ticketId);
        setCurrentView('ticket-detalle');
      }
    }
  };

  if (!isLoggedIn) {
    return <LoginView onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-100 p-4 flex flex-col flex-shrink-0 overflow-y-auto">
          <div className="flex-1">
            <div className="mb-6">
              <SidebarItem 
                icon={LayoutDashboard} 
                label="Tickets" 
                active={currentView === 'tickets'} 
                onClick={() => setCurrentView('tickets')} 
              />
              <SidebarItem 
                icon={Wallet} 
                label="Pagos recibidos" 
                active={currentView === 'pagos-recibidos'} 
                onClick={() => setCurrentView('pagos-recibidos')} 
              />
              <SidebarItem 
                icon={QrCode} 
                label="Códigos QR" 
                active={currentView === 'static-qrs'} 
                onClick={() => setCurrentView('static-qrs')} 
              />
              <SidebarItem 
                icon={Settings} 
                label="Configuración" 
                active={currentView === 'configuracion'}
                onClick={() => setCurrentView('configuracion')}
              />
            </div>
          </div>

          {/* Sidebar Profile Bottom */}
          <div className="mt-auto pt-4 border-t border-gray-100 relative" ref={profileMenuRef}>
            <button 
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
                  {businessLogo ? (
                    <img src={businessLogo} alt="Business" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-sm font-bold text-gray-600">M</span>
                  )}
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-900">{businessName}</p>
                </div>
              </div>
              <ChevronDown size={14} className={`text-gray-400 group-hover:text-gray-600 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isProfileMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute bottom-full left-0 w-full mb-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 overflow-hidden"
                >
                  <button
                    onClick={() => setIsLoggedIn(false)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} />
                    <span>Salir</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white p-8 pb-40 overflow-y-auto">
          <AnimatePresence mode="wait">
            {currentView === 'tickets' && (
              <motion.div 
                key="tickets"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Tickets</h1>
                    <p className="text-sm text-gray-500">Gestioná y seguí todos los cobros activos desde el panel principal.</p>
                  </div>
                  <button 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-copayex-blue text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-sm"
                  >
                    <Plus size={18} />
                    <span>Nuevo Ticket</span>
                  </button>
                </div>

                <div className="border-b border-gray-100 mb-6">
                  <div className="flex gap-8">
                    {['Activos', 'Finalizados', 'Anulados'].map((tab) => {
                      const value = tab === 'Activos' ? 'activo' : tab === 'Finalizados' ? 'finalizado' : 'anulado';
                      return (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(value)}
                          className={`py-4 text-sm font-medium transition-all relative ${activeTab === value ? 'text-copayex-blue' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                          {tab}
                          {activeTab === value && (
                            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-copayex-blue" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-4 mb-6">
                  <div className="relative flex-1 max-w-sm">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Buscar ticket por número, descripción, monto"
                      className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-copayex-blue/10 focus:border-copayex-blue outline-none transition-all text-sm"
                    />
                  </div>
                  {activeTab === 'finalizado' && (
                    <div className="relative max-w-xs">
                      <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="Rango de fechas"
                        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-copayex-blue/10 focus:border-copayex-blue outline-none transition-all text-sm"
                      />
                    </div>
                  )}
                </div>

                {tickets.filter(c => c.status === activeTab).length > 0 ? (
                  <div className="border border-gray-100 rounded-xl">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                          <th className="px-6 py-3 text-xs font-bold text-gray-600 uppercase">Número</th>
                          <th className="px-6 py-3 text-xs font-bold text-gray-600 uppercase">Descripción</th>
                          <th className="px-6 py-3 text-xs font-bold text-gray-600 uppercase text-right">Pagado / Total</th>
                          <th className="px-6 py-3 text-xs font-bold text-gray-600 uppercase text-right">Fecha</th>
                          <th className="px-6 py-3"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {tickets.filter(c => c.status === activeTab).map((ticket) => {
                          const ticketPagado = pagos
                            .filter(p => p.ticketId === ticket.id && p.status !== 'reembolsado')
                            .reduce((acc, p) => acc + p.monto, 0);
                          
                          return (
                            <tr 
                              key={ticket.id} 
                              className="hover:bg-gray-50 transition-colors group cursor-pointer"
                              onClick={() => {
                                setSelectedTicketId(ticket.id);
                                setCurrentView('ticket-detalle');
                              }}
                            >
                              <td className="px-6 py-4 text-sm text-gray-600">{ticket.id}</td>
                              <td className="px-6 py-4">
                                <div className="text-sm font-bold text-gray-900">{ticket.descripcion}</div>
                              </td>
                              <td className="px-6 py-4 text-sm font-bold text-gray-900 text-right">
                                ${formatCurrency(ticketPagado)} / ${formatCurrency(ticket.total)}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="text-xs text-gray-600">{ticket.fecha.split(', ')[0]}</div>
                                <div className="text-[10px] text-gray-400">{ticket.fecha.split(', ')[1]}</div>
                              </td>
                              <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                                {activeTab === 'activo' && (
                                  <ActionDropdown 
                                    options={[
                                      { id: 'copiar', label: 'Link de pago', icon: DollarSign },
                                      { id: 'finalizado', label: 'Finalizado', icon: Check },
                                      { id: 'anulado', label: 'Anulado', icon: Ban },
                                      { id: 'vincular', label: 'Vincular a un QR', icon: LinkIcon },
                                    ]}
                                    onAction={(actionId) => handleTicketAction(ticket.id, actionId)}
                                  />
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="border border-gray-100 rounded-xl p-12 flex flex-col items-center justify-center text-center">
                    <p className="text-gray-500 font-medium">No hay tickets {activeTab === 'activo' ? 'activos' : activeTab === 'finalizado' ? 'finalizados' : 'anulados'}</p>
                  </div>
                )}
              </motion.div>
            )}

            {currentView === 'pagos-recibidos' && (
              <motion.div 
                key="pagos"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Pagos Recibidos</h1>
                    <p className="text-sm text-gray-500">Consultá montos aprobados y el historial de cobros más recientes.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Total</p>
                      <p className="text-lg font-bold text-gray-900">$ {formatCurrency(pagos.filter(p => p.status === pagoFilter).reduce((acc, p) => acc + p.monto, 0))}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Cantidad</p>
                      <p className="text-lg font-bold text-gray-900">{pagos.filter(p => p.status === pagoFilter).length}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mb-6">
                  <div className="relative flex-1 max-w-xs">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Buscar pago por nombre"
                      className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-copayex-blue/10 focus:border-copayex-blue outline-none transition-all text-sm"
                    />
                  </div>
                  <div className="relative max-w-xs">
                    <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Rango de fechas"
                      className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-copayex-blue/10 focus:border-copayex-blue outline-none transition-all text-sm"
                    />
                  </div>
                  <div className="relative max-w-xs">
                    <select 
                      value={pagoFilter}
                      onChange={(e) => setPagoFilter(e.target.value as 'aprobado' | 'reembolsado')}
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-copayex-blue/10 focus:border-copayex-blue outline-none appearance-none transition-all text-sm text-gray-600"
                    >
                      <option value="aprobado">Aprobados</option>
                      <option value="reembolsado">Reembolsados</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="border border-gray-100 rounded-xl overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="px-6 py-3 text-xs font-bold text-gray-600 uppercase">Ticket</th>
                        <th className="px-6 py-3 text-xs font-bold text-gray-600 uppercase">Metodo de pago</th>
                        <th className="px-6 py-3 text-xs font-bold text-gray-600 uppercase">Detalle</th>
                        <th className="px-6 py-3 text-xs font-bold text-gray-600 uppercase text-right">Monto</th>
                        <th className="px-6 py-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {pagos.filter(p => p.status === pagoFilter).map((pago) => (
                        <tr key={pago.id} className="hover:bg-gray-50 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="text-sm font-bold text-gray-900">{pago.ticket}</div>
                            <div className="text-xs text-gray-500">{pago.descripcion}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-sm text-gray-900">
                              {getMetodoLogo(pago.metodoPago) ? (
                                <div className="w-5 h-5 bg-gray-50 rounded-md flex items-center justify-center border border-gray-100 overflow-hidden p-0.5">
                                  <img src={getMetodoLogo(pago.metodoPago)} alt={pago.metodoPago} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                                </div>
                              ) : (
                                <Building2 size={16} className="text-gray-400" />
                              )}
                              <span>{pago.metodoPago}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{pago.formaPago}</td>
                          <td className="px-6 py-4 text-right">
                            <div className={`text-sm font-bold ${pago.status === 'reembolsado' ? 'text-red-600' : 'text-green-600'}`}>$ {formatCurrency(pago.monto)}</div>
                            <div className="text-[10px] text-gray-400">{pago.fecha}</div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            {pago.status === 'aprobado' && (
                              <ActionDropdown 
                                options={[
                                  { id: 'ir-al-ticket', label: 'Ir al ticket', icon: Eye },
                                  { id: 'devolver', label: 'Reembolsar Pago', icon: RotateCcw },
                                ]}
                                onAction={(actionId) => handlePagoAction(pago.id, actionId)}
                              />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  <div className="p-4 border-t border-gray-100 flex items-center justify-center gap-4">
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-400"><ArrowLeft size={16} /></button>
                    <button className="w-8 h-8 flex items-center justify-center bg-copayex-light-blue text-copayex-blue font-bold rounded-full text-sm">1</button>
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-400"><ArrowRight size={16} /></button>
                    <div className="relative">
                      <select className="pl-3 pr-8 py-1 bg-white border border-gray-200 rounded text-sm text-gray-600 appearance-none">
                        <option>10</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentView === 'ticket-detalle' && selectedTicketId && (
              <motion.div
                key="ticket-detalle"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                {(() => {
                  const ticket = tickets.find(c => c.id === selectedTicketId);
                  if (!ticket) return null;
                  const ticketPagosRecibidos = pagos.filter(p => p.ticketId === ticket.id && p.status !== 'reembolsado');
                  const ticketPagosReembolsados = pagos.filter(p => p.ticketId === ticket.id && p.status === 'reembolsado');
                  const ticketPagado = ticketPagosRecibidos.reduce((acc, p) => acc + p.monto, 0);
                  const restaPagar = ticket.total - ticketPagado;

                  return (
                    <>
                      <div className="flex items-center gap-4 mb-8">
                        <button 
                          onClick={() => setCurrentView('tickets')}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl text-gray-900 font-bold">{ticket.descripcion}</span>
                            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                              ticket.status === 'activo' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                              ticket.status === 'finalizado' ? 'bg-green-50 text-green-600 border-green-100' :
                              'bg-red-50 text-red-600 border-red-100'
                            }`}>
                              <RefreshCcw size={12} className={ticket.status === 'activo' ? 'animate-spin-slow' : ''} />
                              <span className="capitalize">{ticket.status}</span>
                            </div>
                            {(ticket.status === 'activo' || ticket.status === 'finalizado') && (
                              <button 
                                onClick={() => {
                                  setQrModalTicketId(ticket.id);
                                  setIsQRModalOpen(true);
                                }}
                                className="flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
                              >
                                <DollarSign size={14} className="text-green-600" />
                                <span>Link de pago</span>
                              </button>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm font-bold text-gray-400">#{ticket.id}</span>
                            <span className="text-gray-300">•</span>
                            <span className="text-sm text-gray-500">{ticket.fecha}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-10 gap-8 mb-8">
                        <div className="md:col-span-6 border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm">
                          <table className="w-full text-center border-collapse">
                            <thead>
                              <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Total</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Pagado</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Resta Pagar</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="px-6 py-12 text-lg font-bold text-gray-900 align-middle">$ {formatCurrency(ticket.total)}</td>
                                <td className="px-6 py-12 text-lg font-bold text-green-600 align-middle">$ {formatCurrency(ticketPagado)}</td>
                                <td className="px-6 py-12 text-lg font-bold text-[#991b1b] align-middle">$ {formatCurrency(restaPagar)}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="md:col-span-4 bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                          <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider">Métodos de pago habilitados</h3>
                          <div className="flex flex-wrap gap-4">
                            {ticket.metodosPagoHabilitados.includes('mp') && (
                              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-100">
                                <div className="w-6 h-6 bg-white rounded flex items-center justify-center border border-gray-100 p-0.5">
                                  <img src="/logo_mercado_pago.png" alt="MP" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                                </div>
                                <span className="text-xs font-bold text-gray-700">Mercado Pago</span>
                              </div>
                            )}
                            {ticket.metodosPagoHabilitados.includes('dc') && (
                              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-100">
                                <CreditCard size={16} className="text-gray-400" />
                                <span className="text-xs font-bold text-gray-700">Tarjeta de débito</span>
                              </div>
                            )}
                            {ticket.metodosPagoHabilitados.includes('cc') && (
                              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-100">
                                <CreditCard size={16} className="text-gray-400" />
                                <span className="text-xs font-bold text-gray-700">Tarjeta de crédito</span>
                              </div>
                            )}
                            {ticket.metodosPagoHabilitados.includes('tb') && (
                              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-100">
                                <div className="w-6 h-6 bg-white rounded flex items-center justify-center border border-gray-100 p-0.5">
                                  <img src="/logo_talo.png" alt="Talo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                                </div>
                                <span className="text-xs font-bold text-gray-700">Transferencia</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h2 className="text-lg font-bold text-gray-900">Pagos Recibidos</h2>
                      </div>

                      <div className="border border-gray-100 rounded-xl bg-white shadow-sm mb-8">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                              <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider rounded-tl-xl">Metodo de pago</th>
                              <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Detalle</th>
                              <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider text-right">Monto</th>
                              <th className="px-6 py-4 rounded-tr-xl"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {ticketPagosRecibidos.length > 0 ? ticketPagosRecibidos.map((pago) => (
                              <tr key={pago.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-5">
                                  <div className="flex items-center gap-3 text-sm font-bold text-gray-900">
                                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 overflow-hidden p-1">
                                      {getMetodoLogo(pago.metodoPago) ? (
                                        <img src={getMetodoLogo(pago.metodoPago)} alt={pago.metodoPago} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                                      ) : (
                                        <Building2 size={16} className="text-gray-400" />
                                      )}
                                    </div>
                                    <span>{pago.metodoPago}</span>
                                  </div>
                                </td>
                                <td className="px-6 py-5 text-sm text-gray-600">{pago.formaPago}</td>
                                <td className="px-6 py-5 text-right">
                                  <div className="text-sm font-bold text-green-600">$ {formatCurrency(pago.monto)}</div>
                                  <div className="text-[10px] text-gray-400 font-medium">{pago.fecha}</div>
                                </td>
                                <td className="px-6 py-5 text-right">
                                  <ActionDropdown 
                                    options={[
                                      { id: 'devolver', label: 'Reembolsar Pago', icon: RotateCcw }
                                    ]}
                                    onAction={(actionId) => handlePagoAction(pago.id, actionId)}
                                  />
                                </td>
                              </tr>
                            )) : (
                              <tr>
                                <td colSpan={4} className="px-6 py-12 text-center">
                                  <div className="flex flex-col items-center gap-2">
                                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
                                      <Building2 size={24} className="text-gray-300" />
                                    </div>
                                    <p className="text-sm text-gray-500 italic">No hay pagos registrados para este ticket.</p>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>

                      {ticketPagosReembolsados.length > 0 && (
                        <>
                          <div className="mb-4">
                            <h2 className="text-lg font-bold text-gray-900">Pagos Reembolsados</h2>
                          </div>

                          <div className="border border-gray-100 rounded-xl bg-white shadow-sm">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                  <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider rounded-tl-xl">Metodo de pago</th>
                                  <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Detalle</th>
                                  <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider text-right">Monto</th>
                                  <th className="px-6 py-4 rounded-tr-xl"></th>
                                </tr>
                              </thead>
                              <tbody>
                                {ticketPagosReembolsados.map((pago) => (
                                  <tr key={pago.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors group">
                                    <td className="px-6 py-5">
                                      <div className="flex items-center gap-3 text-sm font-bold text-gray-400">
                                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 overflow-hidden p-1 opacity-50">
                                          {getMetodoLogo(pago.metodoPago) ? (
                                            <img src={getMetodoLogo(pago.metodoPago)} alt={pago.metodoPago} className="w-full h-full object-contain grayscale" referrerPolicy="no-referrer" />
                                          ) : (
                                            <Building2 size={16} className="text-gray-400" />
                                          )}
                                        </div>
                                        <span className="line-through">{pago.metodoPago}</span>
                                      </div>
                                    </td>
                                    <td className="px-6 py-5 text-sm text-gray-400 line-through">{pago.formaPago}</td>
                                    <td className="px-6 py-5 text-right">
                                      <div className="text-sm font-bold text-gray-400 line-through">$ {formatCurrency(pago.monto)}</div>
                                      <div className="text-[10px] text-gray-400 font-medium">Reembolsado</div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                      <span className="px-3 py-1 bg-gray-100 text-gray-900 text-[10px] font-bold rounded-full border border-gray-200 uppercase">Reembolsado</span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </>
                      )}
                    </>
                  );
                })()}
              </motion.div>
            )}

            {currentView === 'configuracion' && (
              <motion.div 
                key="configuracion"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Configuración</h1>
                <p className="text-sm text-gray-500 mb-8">Gestioná los detalles de tu negocio, métodos de pago e integraciones.</p>

                <div className="border-b border-gray-100 mb-8">
                  <div className="flex gap-8">
                    {[
                      { id: 'cuenta', label: 'Cuenta' },
                      { id: 'metodos', label: 'Métodos de pago' },
                      { id: 'integraciones', label: 'Integraciones' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setConfigTab(tab.id as any)}
                        className={`py-4 text-sm font-medium transition-all relative ${configTab === tab.id ? 'text-copayex-blue' : 'text-gray-400 hover:text-gray-600'}`}
                      >
                        {tab.label}
                        {configTab === tab.id && (
                          <motion.div layoutId="configTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-copayex-blue" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="max-w-4xl">
                  {configTab === 'cuenta' && (
                    <div className="max-w-3xl space-y-8">
                      {/* Business Profile Section */}
                      <section className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100">
                          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Negocio</h3>
                        </div>
                        <div className="p-8">
                          <div className="flex flex-col md:flex-row gap-10 items-start">
                            {/* Logo Upload */}
                            <div className="relative group shrink-0">
                              <div className="w-32 h-32 bg-gray-50 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-200 overflow-hidden group-hover:border-copayex-blue/30 transition-all">
                                {businessLogo ? (
                                  <img src={businessLogo} alt="Business Logo" className="w-full h-full object-cover" />
                                ) : (
                                  <div className="flex flex-col items-center gap-2 text-gray-400">
                                    <Building2 size={32} />
                                    <span className="text-[10px] font-bold uppercase">Logo</span>
                                  </div>
                                )}
                              </div>
                              <label className="absolute -bottom-2 -right-2 p-2.5 bg-copayex-blue text-white rounded-xl shadow-lg cursor-pointer hover:bg-blue-900 transition-all transform hover:scale-110 active:scale-95">
                                <Plus size={16} />
                                <input 
                                  type="file" 
                                  className="hidden" 
                                  accept="image/*"
                                  onChange={handleLogoUpload}
                                />
                              </label>
                            </div>

                            {/* Business Details */}
                            <div className="flex-1 space-y-6 w-full">
                              <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Nombre Comercial</label>
                                <div className="flex items-center gap-3">
                                  {isEditingName ? (
                                    <div className="flex items-center gap-2 w-full max-w-md">
                                      <input 
                                        type="text" 
                                        value={businessName}
                                        onChange={(e) => setBusinessName(e.target.value)}
                                        className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-4 focus:ring-copayex-blue/5 focus:border-copayex-blue outline-none transition-all text-sm font-bold text-gray-900"
                                        autoFocus
                                      />
                                      <button 
                                        onClick={() => {
                                          setIsEditingName(false);
                                          showNotification('Nombre del negocio actualizado');
                                        }}
                                        className="p-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all shadow-sm"
                                      >
                                        <Check size={20} />
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="flex items-center gap-3 group">
                                      <h4 className="text-2xl font-black text-gray-900">{businessName}</h4>
                                      <button 
                                        onClick={() => setIsEditingName(true)}
                                        className="p-1.5 text-gray-300 hover:text-copayex-blue transition-all opacity-0 group-hover:opacity-100"
                                      >
                                        <Edit size={18} />
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Client ID</label>
                                <div className="flex items-center gap-3">
                                  <p className="text-sm font-mono text-gray-600">cp_live_5829471036</p>
                                  <button 
                                    onClick={() => {
                                      navigator.clipboard.writeText('cp_live_5829471036');
                                      showNotification('Client ID copiado');
                                    }}
                                    className="p-1.5 text-gray-300 hover:text-copayex-blue transition-all"
                                    title="Copiar ID"
                                  >
                                    <Copy size={14} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>

                      {/* User Profile Section */}
                      <section className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100">
                          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Usuario</h3>
                        </div>
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-copayex-blue border border-blue-100">
                              <User size={24} />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Email de acceso</label>
                              <p className="text-sm font-bold text-gray-900">juanperez@mail.com</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 border border-gray-100">
                              <Lock size={20} />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">User ID</label>
                              <p className="text-sm font-mono text-gray-600">usr_9284710365</p>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  )}

                  {configTab === 'metodos' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {MOCK_METODOS.map((metodo) => (
                        <motion.button
                          key={metodo.id}
                          whileHover={{ y: -4 }}
                          onClick={() => setSelectedMetodo(metodo)}
                          className="bg-white border border-gray-100 rounded-2xl p-6 text-left shadow-sm hover:shadow-md transition-all group"
                        >
                          <div className="flex items-center justify-between mb-6">
                            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 overflow-hidden p-1.5">
                              {metodo.logo ? (
                                <img src={metodo.logo} alt={metodo.nombre} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                              ) : (
                                <Building2 size={24} className="text-gray-400" />
                              )}
                            </div>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                              metodo.conectado 
                                ? 'bg-green-50 text-green-600 border-green-100' 
                                : 'bg-gray-50 text-gray-400 border-gray-100'
                            }`}>
                              {metodo.conectado ? 'Conectado' : 'No conectado'}
                            </span>
                          </div>
                          <h3 className="font-bold text-gray-900 mb-1">{metodo.nombre}</h3>
                          <p className="text-xs text-gray-500 line-clamp-2">{metodo.descripcion}</p>
                        </motion.button>
                      ))}

                      <AnimatePresence>
                        {selectedMetodo && (
                          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
                            >
                              {selectedMetodo.conectado && (
                                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 p-1.5 overflow-hidden">
                                      {selectedMetodo.logo ? (
                                        <img src={selectedMetodo.logo} alt={selectedMetodo.nombre} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                                      ) : (
                                        <Building2 size={20} className="text-gray-400" />
                                      )}
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">{selectedMetodo.nombre}</h2>
                                  </div>
                                  <button 
                                    onClick={() => setSelectedMetodo(null)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                                  >
                                    <X size={20} />
                                  </button>
                                </div>
                              )}
                              <div className="p-8 space-y-8">
                                {selectedMetodo.conectado ? (
                                  <>
                                    <div className="grid grid-cols-2 gap-8">
                                      <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">Estado</p>
                                        <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full border border-green-100">Conectado</span>
                                      </div>
                                      <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">Titular</p>
                                        <p className="text-sm font-bold text-gray-900">{selectedMetodo.titular}</p>
                                      </div>
                                      <div className="col-span-2">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">Cuenta / ID</p>
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                                          <p className="text-sm font-mono font-medium text-gray-600 truncate mr-4">{selectedMetodo.cuenta}</p>
                                          <button className="text-copayex-blue hover:text-blue-700 transition-colors">
                                            <Copy size={16} />
                                          </button>
                                        </div>
                                      </div>
                                      <div className="col-span-2">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">Email vinculado</p>
                                        <p className="text-sm font-bold text-gray-900">{selectedMetodo.email}</p>
                                      </div>
                                    </div>
                                    <div className="pt-6 border-t border-gray-100 flex gap-4">
                                      <button 
                                        onClick={() => setSelectedMetodo(null)}
                                        className="flex-1 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all"
                                      >
                                        Cerrar
                                      </button>
                                      <button className="flex-1 py-3 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm font-bold hover:bg-red-100 transition-all">
                                        Desconectar
                                      </button>
                                    </div>
                                  </>
                                ) : (
                                  <div className="flex flex-col gap-6 py-4">
                                    <button className="w-full py-4 bg-copayex-blue text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                                      Vincular tu cuenta de {selectedMetodo.nombre}
                                    </button>
                                    <button 
                                      onClick={() => setSelectedMetodo(null)}
                                      className="w-full py-4 bg-white border border-gray-200 rounded-2xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all"
                                    >
                                      Cancelar
                                    </button>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {configTab === 'integraciones' && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-1">API Keys de Copayex</h2>
                        <p className="text-sm text-gray-500">Creá una integración para conectarte con nuestros servicios. Cada cliente recibe una API key única que se utiliza para autenticar tus requests contra la API de Copayex.</p>
                      </div>

                      <div className="mt-8 p-12 border-2 border-dashed border-blue-100 rounded-3xl bg-blue-50/30 flex flex-col items-center justify-center text-center">
                        <p className="text-base font-bold text-gray-900 mb-1">Aún no creaste tu cliente de aplicaciones</p>
                        <p className="text-sm text-gray-500 mb-8">Creá uno para comenzar a utilizar nuestra API.</p>
                        <button 
                          onClick={() => setIsCreateIntegrationModalOpen(true)}
                          className="px-8 py-3 bg-[#0a3d62] text-white font-bold rounded-xl hover:bg-[#082d49] transition-all shadow-lg shadow-blue-900/10"
                        >
                          Crear cliente de integraciones
                        </button>
                      </div>

                      <AnimatePresence>
                        {isCreateIntegrationModalOpen && (
                          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: 20 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: 20 }}
                              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
                            >
                              <div className="p-8">
                                <h2 className="text-xl font-bold text-gray-900 mb-2">Crear cliente</h2>
                                <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                                  Ingresá la URL de tu endpoint HTTPS y elegí los eventos a monitorear. Te enviaremos un secret único para validar las firmas entrantes.
                                </p>

                                <div className="space-y-6">
                                  <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-2">Nombre de la aplicación</label>
                                    <input 
                                      type="text" 
                                      placeholder="Ej. Copayex Store"
                                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-copayex-blue/10 focus:border-copayex-blue outline-none transition-all text-sm"
                                    />
                                    <p className="text-[10px] text-gray-400 mt-2">Ingresá un nombre válido (al menos 3 caracteres).</p>
                                  </div>

                                  <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-2">Expiración (opcional)</label>
                                    <div className="relative">
                                      <input 
                                        type="text" 
                                        placeholder="Seleccioná una fecha"
                                        className="w-full pl-4 pr-12 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-copayex-blue/10 focus:border-copayex-blue outline-none transition-all text-sm"
                                      />
                                      <Calendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    </div>
                                    <p className="text-[10px] text-gray-400 mt-2">Podés dejarla vacía si no querés caducidad.</p>
                                  </div>
                                </div>

                                <div className="mt-10 flex justify-end gap-4">
                                  <button 
                                    onClick={() => setIsCreateIntegrationModalOpen(false)}
                                    className="px-8 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all"
                                  >
                                    Cancelar
                                  </button>
                                  <button 
                                    onClick={() => setIsCreateIntegrationModalOpen(false)}
                                    className="px-8 py-3 bg-[#607d8b] text-white font-bold rounded-xl hover:bg-[#546e7a] transition-all shadow-lg shadow-gray-200"
                                  >
                                    Crear integración
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        )}
                      </AnimatePresence>

                      <div className="pt-8 border-t border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-1">Webhooks</h2>
                        <p className="text-sm text-gray-500">Definí a qué endpoint enviaremos los eventos y qué tipos de cambios querés recibir.</p>
                        
                        <div className="mt-8 p-12 border-2 border-dashed border-blue-100 rounded-3xl bg-blue-50/30 flex flex-col items-center justify-center text-center">
                          <p className="text-base font-bold text-gray-900 mb-1">Aún no configuraste un webhook.</p>
                          <p className="text-sm text-gray-500 mb-8">Creá uno para comenzar a recibir eventos desde tu aplicación.</p>
                          <button 
                            onClick={() => setIsCreateWebhookModalOpen(true)}
                            className="px-8 py-3 bg-[#0a3d62] text-white font-bold rounded-xl hover:bg-[#082d49] transition-all shadow-lg shadow-blue-900/10"
                          >
                            Crear webhook
                          </button>
                        </div>
                      </div>

                      <AnimatePresence>
                        {isCreateWebhookModalOpen && (
                          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: 20 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: 20 }}
                              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
                            >
                              <div className="p-8">
                                <h2 className="text-xl font-bold text-gray-900 mb-2">Crear Webhook</h2>
                                <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                                  Ingresá la URL de tu endpoint HTTPS y elegí los eventos a monitorear. Te enviaremos un secret único para validar las firmas entrantes.
                                </p>

                                <div className="space-y-6">
                                  <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-2">URL de Webhook</label>
                                    <input 
                                      type="text" 
                                      placeholder="https://"
                                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-copayex-blue/10 focus:border-copayex-blue outline-none transition-all text-sm"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-4">Eventos a notificar</label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      {[
                                        { id: 'completed', label: 'Pago completado', desc: 'Se dispara cuando el cobro queda totalmente acreditado en tu cuenta.' },
                                        { id: 'partial', label: 'Pago parcial', desc: 'Te avisamos cada vez que recibís un pago parcial y cuánto resta cobrar.' },
                                        { id: 'cancelled', label: 'Pago cancelado', desc: 'Se genera cuando el pagador o el sistema anula el intento de pago.' },
                                        { id: 'failed', label: 'Pago fallido', desc: 'Recibís esta notificación si un pago no pudo completarse correctamente.' }
                                      ].map((event) => (
                                        <label key={event.id} className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
                                          <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-300 text-copayex-blue focus:ring-copayex-blue" />
                                          <div>
                                            <p className="text-sm font-bold text-gray-900">{event.label}</p>
                                            <p className="text-[11px] text-gray-500 leading-tight mt-0.5">{event.desc}</p>
                                          </div>
                                        </label>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                <p className="text-xs text-gray-400 mt-8">Podés crear varios webhooks si necesitás separar responsabilidades o ambientes.</p>

                                <div className="mt-8 flex justify-end gap-4">
                                  <button 
                                    onClick={() => setIsCreateWebhookModalOpen(false)}
                                    className="px-8 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all"
                                  >
                                    Cancelar
                                  </button>
                                  <button 
                                    onClick={() => setIsCreateWebhookModalOpen(false)}
                                    className="px-8 py-3 bg-[#607d8b] text-white font-bold rounded-xl hover:bg-[#546e7a] transition-all shadow-lg shadow-gray-200"
                                  >
                                    Crear webhook
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
            
            {currentView === 'static-qrs' && (
              <motion.div 
                key="qrs"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Códigos QR</h1>
                    <p className="text-sm text-gray-500">Observá qué QRs están disponibles o vinculados y generá uno nuevo en segundos.</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-copayex-blue text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-sm">
                    <Plus size={18} />
                    <span>Nuevo QR</span>
                  </button>
                </div>

                <div className="border border-gray-100 rounded-xl overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="px-6 py-3 text-xs font-bold text-gray-600 uppercase">Numero</th>
                        <th className="px-6 py-3 text-xs font-bold text-gray-600 uppercase">Estado</th>
                        <th className="px-6 py-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {qrs.map((qr) => (
                        <tr key={qr.id} className="hover:bg-gray-50 transition-colors group">
                          <td className="px-6 py-4 text-sm font-bold text-gray-900">{qr.numero}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span className={`px-4 py-1 rounded-full text-xs font-bold border ${
                                qr.estado === 'disponible' 
                                  ? 'bg-green-50 text-green-600 border-green-100' 
                                  : 'bg-red-50 text-red-600 border-red-100'
                              }`}>
                                {qr.estado === 'disponible' ? 'Disponible' : 'En uso'}
                              </span>
                              {qr.vinculo && (
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 border border-gray-100 rounded-full text-xs font-bold text-gray-600">
                                  <ShoppingCart size={12} className="text-gray-400" />
                                  <span>{qr.vinculo}</span>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-4 text-gray-400">
                              {qr.estado === 'disponible' ? (
                                <>
                                  <button className="hover:text-copayex-blue transition-colors"><Plus size={18} /></button>
                                  <button className="hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                                </>
                              ) : (
                                <button className="cursor-not-allowed opacity-50"><Ban size={18} /></button>
                              )}
                              <button className="hover:text-gray-900 transition-colors"><Download size={18} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
            {currentView === 'pago-pantalla' && selectedTicketId && (
              <PagoPantalla 
                ticket={tickets.find(c => c.id === selectedTicketId)!}
                pagos={pagos}
                businessLogo={businessLogo}
                businessName={businessName}
                onBack={() => setCurrentView('tickets')}
                onPaymentComplete={(amount, name, methodId) => {
                  const now = new Date();
                  const fechaStr = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear().toString().slice(-2)}, ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
                  
                  let metodoPago = '';
                  let formaPago = '';

                  if (methodId === 'tb') {
                    metodoPago = 'Talo';
                    formaPago = 'Transferencia Bancaria';
                  } else if (methodId === 'mp') {
                    metodoPago = 'Mercado Pago';
                    formaPago = 'Dinero en cuenta';
                  } else if (methodId === 'cc') {
                    metodoPago = 'Mercado Pago';
                    formaPago = 'Tarjeta de Crédito **** 1234';
                  } else if (methodId === 'dc') {
                    metodoPago = 'Mercado Pago';
                    formaPago = 'Tarjeta de Débito **** 1234';
                  } else {
                    // Fallback
                    metodoPago = methodId;
                    formaPago = 'Pago parcial';
                  }

                  const newPago: PagoRecibido = {
                    id: pagos.length > 0 ? Math.max(...pagos.map(p => p.id)) + 1 : 1,
                    ticketId: selectedTicketId,
                    ticket: `#${selectedTicketId}`,
                    descripcion: `${name} - Pago parcial`,
                    metodoPago: metodoPago,
                    formaPago: formaPago,
                    monto: amount,
                    fecha: fechaStr,
                    status: 'aprobado'
                  };
                  
                  setPagos([newPago, ...pagos]);
                  showNotification('Pago realizado con éxito');
                }}
              />
            )}
          </AnimatePresence>
        </main>
      </div>

      <CreateTicketModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onCreate={handleCreateTicket}
      />

      <AnimatePresence>
        {isQRModalOpen && (
          <QRLinkModal 
            isOpen={isQRModalOpen}
            onClose={() => setIsQRModalOpen(false)}
            ticketId={qrModalTicketId}
            onGoToPay={(id) => {
              setSelectedTicketId(id);
              setCurrentView('pago-pantalla');
              setIsQRModalOpen(false);
            }}
            onCopyLink={(id) => {
              navigator.clipboard.writeText(`https://copayex.com/pay/${id}`).then(() => {
                showNotification('Link de pago copiado');
                setIsQRModalOpen(false);
              });
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-8 left-1/2 bg-[#dcfce7] text-green-800 border border-green-200 px-6 py-3 rounded-full shadow-lg flex items-center gap-4 z-[100] whitespace-nowrap"
          >
            <div className="flex items-center gap-2">
              <Check size={18} className="text-green-600" />
              <span className="font-bold text-sm">{toast.message}</span>
            </div>
            {toast.action && (
              <button 
                onClick={() => {
                  toast.action?.onClick();
                  setToast(null);
                }}
                className="px-3 py-1 bg-green-800/10 hover:bg-green-800/20 rounded-full text-xs font-bold transition-colors"
              >
                {toast.action.label}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

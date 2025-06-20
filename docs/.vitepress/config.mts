import { defineConfig } from "vitepress"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "SML Document",
  description: "SMLSoft Application Document",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Get Started",
        items: [
          // { text: "ก่อนการใช้งาน", link: "/getstarted/getstarted" },
          {
            text: "ติดตั้ง Server",
            link: "/getstarted/install-server-windows",
          },
          { text: "การติดตั้งโปรแกรม", link: "/getstarted/program_install" },
          { text: "กำหนดรายละเอียดกิจการ", link: "/getstarted/company_setup" },
          { text: "การกำหนดค่าเริ่มต้น", link: "/getstarted/system_config" },
          { text: "การนำเข้าข้อมูลหลัก", link: "/getstarted/data_import" },
          {
            text: "การกำหนดค่าตามลักษณะธุรกิจ",
            link: "/getstarted/special_config",
          },
        ],
      },
      {
        text: "ระบบบัญชี",
        items: [
          {
            text: "กำหนดค่าเริ่มต้นระบบ ค่าหลัก และระบบสาขา",
            link: "/accounting/general_config",
          },
          { text: "ระบบคลังสินค้า", link: "/accounting/inventory_system" },
        ],
      },
      {
        text: "ระบบ POS",
        items: [
          { text: "การตั้งค่าระบบ POS", link: "/pos/pos_config" },
          {
            text: "การกำหนดคุณสมบัติเครื่อง POS",
            link: "/pos/pos_device_config",
          },
          { text: "หน้าจอขาย POS", link: "/pos/pos_screen" },
          { text: "คีย์ลัด", link: "/pos/pos_hotkey" },
        ],
      },
      {
        text: "โปรแกรมบริหารจัดการ",
        items: [
          {
            text: "คู่มือ Pick and Pack การจ่ายสินค้าหลังร้าน",
            link: "/managementsoftware/pick_and_pack",
          },
          { text: "คู่มือ TMS ระบบการจัดส่ง", link: "/managementsoftware/tms" },
          {
            text: "ระบบการขายผ่าน Mobile",
            link: "/managementsoftware/mobile_sales",
          },
          {
            text: "ระบบการตรวจนับสินค้าผ่าน Mobile",
            link: "/managementsoftware/mobile_stock",
          },
          { text: "ระบบ CRM", link: "/managementsoftware/crm_system" },
        ],
      },
      {
        text: "SML Tip & Tool",
        items: [
          { text: "เทคนิคต่างๆ", link: "/tips/technical" },
          { text: "ปัญหาการใช้งานและวิธีแก้ไข", link: "/tips/troubleshoot" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
})

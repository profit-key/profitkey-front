import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const options = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderRadius: 5,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  categoryPercentage: 0.5,
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      align: 'end' as const,
      anchor: 'end' as const,
      font: {
        family: 'Noto Sans KR, sans-serif',
        size: 16,
        weight: 'bold' as const,
      },
    },
    tooltip: {
      enabled: false,
    },
  },
  scales: {
    x: {
      border: {
        display: false,
      },
      grid: {
        drawBorder: false,
        display: false,
      },
      ticks: { display: false },
    },
    y: {
      border: {
        display: false,
      },
      grid: {
        drawBorder: false,
        display: false,
      },
      ticks: {
        padding: 0,
        font: {
          family: 'Noto Sans KR, sans-serif',
          size: 16,
          weight: 'bold' as const,
        },
      },
    },
  },
  layout: {
    padding: { right: 16 },
  },
};

const labels = ['적극매수', '매수', '유지', '매도', '적극매도'];

const data = {
  labels,
  datasets: [
    {
      label: '의견 수',
      data: [15, 10, 5, 3, 1], // 고정된 데이터 값으로 대체
      backgroundColor: [
        '#0074D9',
        '#0074D980',
        '#6ABF4B',
        '#FFB40080',
        '#FFB400',
      ],
    },
  ],
};

export function InvestorOpinionChart() {
  return <Bar options={options} data={data} />;
}

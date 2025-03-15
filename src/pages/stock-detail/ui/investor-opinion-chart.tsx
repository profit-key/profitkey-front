import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { InvestorOpinion } from '@/entities/stock/api/schema';
import { INVESTMENT_OPINION } from './utill';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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

const labels = Object.values(INVESTMENT_OPINION);
const backgroundColor = [
  '#0074D9',
  '#0074D980',
  '#0074D940',
  '#6ABF4B',
  '#FFB40080',
  '#FFB400',
];

export function InvestorOpinionChart({ data }: { data: InvestorOpinion[] }) {
  // 의견 개수 카운팅
  const opinionCounts = labels.map(() => 0);
  data.forEach((item) => {
    const translatedOpinion =
      INVESTMENT_OPINION[
        item.invt_opnn.toUpperCase() as keyof typeof INVESTMENT_OPINION
      ];
    if (translatedOpinion) {
      // 데이터에 있는 의견이 있으면 개수를 증가
      const index = labels.indexOf(translatedOpinion);
      if (index !== -1) {
        opinionCounts[index]++;
      }
    }
  });

  // x축의 최대값을 계산 (최대값의 10% 여유 공간 추가)
  const maxOpinionCount = Math.max(...opinionCounts);
  const xMaxValue = Math.ceil(maxOpinionCount * 1.1);

  const chartOptions = {
    ...options,
    scales: {
      ...options.scales,
      x: {
        ...options.scales.x,
        max: xMaxValue,
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: '의견 수',
        data: opinionCounts,
        backgroundColor,
      },
    ],
  };

  return <Bar options={chartOptions} data={chartData} />;
}

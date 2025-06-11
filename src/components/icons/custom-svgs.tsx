import { type SVGProps } from 'react'

export type CustomSvgProps = SVGProps<SVGSVGElement> & {
  width?: number
  height?: number
  fill?: string
  stroke?: string
}

type IconCourseBeginnerLevelProps = CustomSvgProps & {
  barColor?: string
}

type IconCourseIntermediateLevelProps = CustomSvgProps & {
  barColor?: string
}

type IconCourseAdvancedLevelProps = CustomSvgProps & {
  barColor?: string
}

function IconCourseBeginnerLevel({
  width = 16,
  height = 17,
  barColor = '#29E0A9',
  ...props
}: IconCourseBeginnerLevelProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M4.13 6.85H2.88a.625.625 0 00-.625.625v4.75c0 .345.28.625.625.625h1.25c.346 0 .625-.28.625-.625v-4.75a.625.625 0 00-.625-.625z"
          fill={barColor}
          stroke={barColor}
        />
        <path
          d="M8.63 5.35H7.38a.625.625 0 00-.625.625v6.25c0 .345.28.625.625.625h1.25c.346 0 .625-.28.625-.625v-6.25a.625.625 0 00-.625-.625zM13.12 3.35h-1.25a.625.625 0 00-.625.625v8.25c0 .345.28.625.625.625h1.25c.345 0 .625-.28.625-.625v-8.25a.625.625 0 00-.625-.625z"
          fill="#505059"
          stroke="#505059"
        />
      </g>
    </svg>
  )
}

function IconCourseIntermediateLevel({
  width = 16,
  height = 17,
  barColor = '#29E0A9',
  ...props
}: IconCourseIntermediateLevelProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.13 6.85H2.88a.625.625 0 00-.624.625v4.75c0 .345.28.625.625.625h1.25c.345 0 .625-.28.625-.625v-4.75a.625.625 0 00-.625-.625zM8.63 5.35H7.38a.625.625 0 00-.624.625v6.25c0 .345.28.625.625.625h1.25c.345 0 .625-.28.625-.625v-6.25a.625.625 0 00-.625-.625z"
        fill={barColor}
        stroke={barColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.12 3.35h-1.25a.625.625 0 00-.626.625v8.25c0 .345.28.625.625.625h1.25c.346 0 .625-.28.625-.625v-8.25a.625.625 0 00-.625-.625z"
        fill="#505059"
        stroke="#505059"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconCourseAdvancedLevel({
  width = 16,
  height = 16,
  barColor = '#29E0A9',
  ...props
}: IconCourseAdvancedLevelProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        fill={barColor}
        stroke={barColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4.13 6.75H2.88a.625.625 0 00-.624.625v4.75c0 .345.28.625.625.625h1.25c.345 0 .625-.28.625-.625v-4.75a.625.625 0 00-.625-.625zM8.63 5.25H7.38a.625.625 0 00-.624.625v6.25c0 .345.28.625.625.625h1.25c.345 0 .625-.28.625-.625v-6.25a.625.625 0 00-.625-.625zM13.12 3.25h-1.25a.625.625 0 00-.626.625v8.25c0 .345.28.625.625.625h1.25c.346 0 .625-.28.625-.625v-8.25a.625.625 0 00-.625-.625z" />
      </g>
    </svg>
  )
}

function IconsGithub({ width = 16, height = 16, ...props }: CustomSvgProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
        fill="currentColor"
      />
    </svg>
  )
}

function IconLinkedIn({ width = 16, height = 16, ...props }: CustomSvgProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20.47 2H3.53C2.64 2 2 2.64 2 3.53v16.94c0 .89.64 1.53 1.53 1.53h16.94c.89 0 1.53-.64 1.53-1.53V3.53C22 2.64 21.36 2 20.47 2zM8.09 18.74h-3v-9h3v9zM6.59 8.48c-.97 0-1.75-.79-1.75-1.75 0-.97.79-1.75 1.75-1.75.97 0 1.75.79 1.75 1.75 0 .97-.78 1.75-1.75 1.75zm12.15 10.26h-3v-4.83c0-1.22-.44-2.05-1.52-2.05-.82 0-1.31.55-1.53 1.09-.08.19-.1.46-.1.73v5.06h-3V9.74h3v1.29c.4-.61 1.12-1.48 2.73-1.48 2 0 3.42 1.31 3.42 4.12v5.07z"
        fill="currentColor"
      />
    </svg>
  )
}

export {
  IconCourseAdvancedLevel,
  IconCourseBeginnerLevel,
  IconCourseIntermediateLevel,
  IconsGithub,
  IconLinkedIn
}

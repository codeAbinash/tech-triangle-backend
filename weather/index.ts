type Weather = {
  current: WeatherCurrent
  forecastDaily: ForecastDaily
  forecastHourly: ForecastHourly
  indices: WeatherIndices
  alerts: any[]
  yesterday: Yesterday
  url: {
    accu: string
  }
  brandInfo: BrandInfo
  sourceMaps: SourceMaps
  updateTime: number
  aqi: Aqi
}

type Aqi = {
  status: number
}

type BrandInfo = {
  brands: Brand[]
}

type Brand = {
  brandId: string
  logo: string
  names: Names
  url: string
}

type Names = {
  zh_TW: string
  en_US: string
  zh_CN: string
}

type WeatherCurrent = {
  feelsLike: FeelsLike
  humidity: FeelsLike
  pressure: FeelsLike
  pubTime: Date
  temperature: FeelsLike
  uvIndex: string
  visibility: FeelsLike
  weather: string
  wind: CurrentWind
}

type FeelsLike = {
  unit: string
  value: string
}

type CurrentWind = {
  direction: FeelsLike
  speed: FeelsLike
}

type ForecastDaily = {
  aqi: Aqi
  moonPhase: null
  precipitationProbability: PrecipitationProbability
  pubTime: Date
  status: number
  sunRiseSet: SunRiseSet
  temperature: DirectionClass
  weather: SunRiseSet
  wind: ForecastDailyWind
}

type PrecipitationProbability = {
  status: number
  value: string[]
}

type SunRiseSet = {
  status: number
  value: SunRiseSetValue[]
}

type SunRiseSetValue = {
  from: string
  to: string
}

type DirectionClass = {
  status: number
  unit: string
  value: SunRiseSetValue[]
}

type ForecastDailyWind = {
  direction: DirectionClass
  speed: DirectionClass
}

type ForecastHourly = {
  aqi: Aqi
  desc: string
  status: number
  temperature: WeatherClass
  weather: WeatherClass
  wind: ForecastHourlyWind
}

type WeatherClass = {
  pubTime: Date
  status: number
  unit?: string
  value: number[]
}

type ForecastHourlyWind = {
  status: number
  value: WindValue[]
}

type WindValue = {
  datetime: Date
  direction: string
  speed: string
}

type WeatherIndices = {
  indices: Index[]
  pubTime: string
  status: number
}

type Index = {
  type: string
  value: string
}

type SourceMaps = {
  current: SourceMapsCurrent
  indices: SourceMapsIndices
  daily: Daily
  clientInfo: ClientInfo
  hourly: Hourly
}

type ClientInfo = {
  appVersion: number
  isLocated: boolean
  isGlobal: boolean
  appKey: string
  locale: string
}

type SourceMapsCurrent = {
  feelsLike: string
  weather: string
  temperature: string
  humidity: string
  pressure: string
  windDir: string
  windSpeed: string
  uvIndex: string
}

type Daily = {
  preciProbability: string
  weather: string
  temperature: string
  sunRiseSet: string
  aqi: string
  wind: string
}

type Hourly = {
  weather: string
  temperature: string
  aqi: string
  wind: string
}

type SourceMapsIndices = {
  feelsLikeV1: string
  pressureV1: string
  uvIndexV1: string
}

type Yesterday = {
  aqi: string
  date: string
  status: number
  sunRise: string
  sunSet: string
  tempMax: string
  tempMin: string
  weatherEnd: string
  weatherStart: string
  windDircEnd: string
  windDircStart: string
  windSpeedEnd: string
  windSpeedStart: string
}

# Запуск проекта

## Шаг 1: Клонирование

Сначала клонируйте репозиторий с кодом проекта:

```bash
git clone https://github.com/KJONDIVE/UserManagementTest.git
```

Перейдите в корневую папку проекта через терминал:

```bash
cd ./UserManagementTest
```

## Шаг 2: Установка зависимостей

Для установки всех необходимых зависимостей выполните команду:

```bash
npm install
```

## Шаг 3: Настройка iOS

Перейдите в папку ios и установите зависимости для проекта:

```bash
cd ios
pod install
cd ..
```

## Шаг 4: Запуск Metro Bundler

Для запуска Metro Bundler, который необходим для сборки приложения, выполните команду:

```bash
npx react-native start
```

## Шаг 5: Запуск на устройстве или эмуляторе
## Запуск на iOS:

Выполните следующую команду для запуска приложения на iOS (на устройстве или эмуляторе):

```bash
npx react-native run-ios
```

## Запуск на Android:

Выполните следующую команду для запуска приложения на Android:

```bash
npx react-native run-android
```

## Шаг 6: Создание apk файла (для Android)

Выполните следующую команду для создания apk файла для запуска на реальном телефоне:

```bash
cd android
./gradlew assembleRelease
cd ..
```
После успешного выполнения перейдите по следующему пути:

```bash
cd ./android/app/build/outputs/apk/release
```
В этой папке находится файл под названием app-release.apk

Его можно отправить через различные мессенджеры себе на телефон, после чего установить и использовать.

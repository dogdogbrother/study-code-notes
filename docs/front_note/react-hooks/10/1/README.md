## 前言
这门课学的是什么呢，我觉得有以下几点。

1. hooks虽然懂，但是细节还不够，希望能完善。
2. TS懵懵懂懂，希望能加深TS的学习使用。
3. 组件设置时的样式和class的搭配，怎么做是科学的。
4. 加固测试步骤。

## 安装

```ssh
npx create-react-app senlin-component --typescript
```
然后把原始的一些css什么没用的文件都删除掉。

## 基础样式
项目没有使用比较常见的 `style-component`，而是使用了sass。  

### 文件结构
src 下新建个文件夹 styles，里面有三文件，`_variables.scss`, `_reboot.scss`, `index.scss`.

1. `_variables` 文件定义了日常使用的样式常量,和字体文字库。
```scss
$white:    #fff !default;
$gray-100: #f8f9fa !default;
$gray-200: #e9ecef !default;
$gray-300: #dee2e6 !default;
$gray-400: #ced4da !default;
$gray-500: #adb5bd !default;
$gray-600: #6c757d !default;
$gray-700: #495057 !default;
$gray-800: #343a40 !default;
$gray-900: #212529 !default;
$black:    #000 !default;

$blue:    #0d6efd !default;
$indigo:  #6610f2 !default;
$purple:  #6f42c1 !default;
$pink:    #d63384 !default;
$red:     #dc3545 !default;
$orange:  #fd7e14 !default;
$yellow:  #fadb14 !default;
$green:   #52c41a !default;
$teal:    #20c997 !default;
$cyan:    #17a2b8 !default;

$primary:       $blue !default;
$secondary:     $gray-600 !default;
$success:       $green !default;
$info:          $cyan !default;
$warning:       $yellow !default;
$danger:        $red !default;
$light:         $gray-100 !default;
$dark:          $gray-800 !default;

$font-family-sans-serif:      -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !default;
$font-family-monospace:       SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !default;
$font-family-base:            $font-family-sans-serif !default;

// 字体大小
$font-size-base:              1rem !default; // Assumes the browser default, typically `16px`
$font-size-lg:                $font-size-base * 1.25 !default;
$font-size-sm:                $font-size-base * .875 !default;
$font-size-root:              null !default;

// 字重
$font-weight-lighter:         lighter !default;
$font-weight-light:           300 !default;
$font-weight-normal:          400 !default;
$font-weight-bold:            700 !default;
$font-weight-bolder:          bolder !default;
$font-weight-base:            $font-weight-normal !default;

// 行高
$line-height-base:            1.5 !default;
$line-height-lg:              2 !default;
$line-height-sm:              1.25 !default;

// 标题大小
$h1-font-size:                $font-size-base * 2.5 !default;
$h2-font-size:                $font-size-base * 2 !default;
$h3-font-size:                $font-size-base * 1.75 !default;
$h4-font-size:                $font-size-base * 1.5 !default;
$h5-font-size:                $font-size-base * 1.25 !default;
$h6-font-size:                $font-size-base !default;

// 链接
$link-color:                              $primary !default;
$link-decoration:                         none !default;
$link-hover-color:                        darken($link-color, 15%) !default;
$link-hover-decoration:                   underline !default;

// body
$body-bg:                   $white !default;
$body-color:                $gray-900 !default;
$body-text-align:           null !default;

// Spacing
$spacer: 1rem !default;

$headings-margin-bottom:      $spacer / 2 !default;
$headings-font-family:        null !default;
$headings-font-style:         null !default;
$headings-font-weight:        500 !default;
$headings-line-height:        1.2 !default;
$headings-color:              null !default;

// Paragraphs

$paragraph-margin-bottom:   1rem !default;

// 字体其他部分 heading list hr 等等
$headings-margin-bottom:      $spacer / 2 !default;
$headings-font-family:        null !default;
$headings-font-style:         null !default;
$headings-font-weight:        500 !default;
$headings-line-height:        1.2 !default;
$headings-color:              null !default;

$display1-size:               6rem !default;
$display2-size:               5.5rem !default;
$display3-size:               4.5rem !default;
$display4-size:               3.5rem !default;

$display1-weight:             300 !default;
$display2-weight:             300 !default;
$display3-weight:             300 !default;
$display4-weight:             300 !default;
$display-line-height:         $headings-line-height !default;

$lead-font-size:              $font-size-base * 1.25 !default;
$lead-font-weight:            300 !default;

$small-font-size:             .875em !default;

$sub-sup-font-size:           .75em !default;

$text-muted:                  $gray-600 !default;

$initialism-font-size:        $small-font-size !default;

$blockquote-small-color:      $gray-600 !default;
$blockquote-small-font-size:  $small-font-size !default;
$blockquote-font-size:        $font-size-base * 1.25 !default;

$hr-color:                    inherit !default;
$hr-height:                   1px !default;
$hr-opacity:                  .25 !default;

$legend-margin-bottom:        .5rem !default;
$legend-font-size:            1.5rem !default;
$legend-font-weight:          null !default;

$mark-padding:                .2em !default;

$dt-font-weight:              $font-weight-bold !default;

$nested-kbd-font-weight:      $font-weight-bold !default;

$list-inline-padding:         .5rem !default;

$mark-bg:                     #fcf8e3 !default;

$hr-margin-y:                 $spacer !default;

// Code

$code-font-size:                    $small-font-size !default;
$code-color:                        $pink !default;
$pre-color:                         null !default;

// options 可配置选项
$enable-pointer-cursor-for-buttons:           true !default;
```

2. `_reboot.scss` 是把 `normalize.css` 的内容复制过来的，其中里面的一些样式用 `_variables` 定义的常量即可：
```scss
// ...
body {
  margin: 0; // 1
  font-family: $font-family-base;
  font-size: $font-size-base;
  font-weight: $font-weight-base;
  line-height: $line-height-base;
  color: $body-color;
  text-align: $body-text-align;
  background-color: $body-bg; 
  -webkit-text-size-adjust: 100%; 
  -webkit-tap-highlight-color: rgba($black, 0);
}
%heading {
  margin-top: 0; // 1
  margin-bottom: $headings-margin-bottom;
  font-family: $headings-font-family;
  font-style: $headings-font-style;
  font-weight: $headings-font-weight;
  line-height: $headings-line-height;
  color: $headings-color;
}
h1 {
  @extend %heading;
  font-size: $h1-font-size;
}
// ...
```
> 注意 `@extend` 的用法。

3. 之所以 `_reboot.scss` 能用 `_variables` 的变量，是因为 `index.scss` 文件把他们俩按照顺序引入的：
```scss
@import "variables";
@import "reboot";
```

> sass 中加了 `_` 的文件就是私有样式文件，引入时是不需要加下划线的。
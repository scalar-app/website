import { describe, expect, it } from 'vitest';
import { withBase } from './links';

describe('withBase', () => {
  it('keeps root paths when base is "/"', () => {
    expect(withBase('/', '/')).toBe('/');
    expect(withBase('/download', '/')).toBe('/download');
    expect(withBase('download', '/')).toBe('/download');
  });

  it('prefixes paths with a sub-path base', () => {
    expect(withBase('/', '/website/')).toBe('/website/');
    expect(withBase('/download', '/website/')).toBe('/website/download');
    expect(withBase('/docs#privacy', '/website')).toBe('/website/docs#privacy');
  });

  it('never double-slashes', () => {
    expect(withBase('/a/', '/b/')).toBe('/b/a/');
  });

  it('leaves absolute and protocol-relative URLs alone', () => {
    expect(withBase('https://github.com/scalar-app', '/website/')).toBe(
      'https://github.com/scalar-app',
    );
    expect(withBase('mailto:x@y.z', '/website/')).toBe('mailto:x@y.z');
    expect(withBase('//cdn.example', '/website/')).toBe('//cdn.example');
  });
});

import 'dart:io';

import 'package:flutter/material.dart';
import 'package:omi/providers/onboarding_provider.dart';
import 'package:omi/utils/platform/platform_service.dart';
import 'package:omi/widgets/dialog.dart';
import 'package:gradient_borders/box_borders/gradient_box_border.dart';
import 'package:intercom_flutter/intercom_flutter.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:provider/provider.dart';

class PermissionsMobileWidget extends StatefulWidget {
  final VoidCallback goNext;

  const PermissionsMobileWidget({super.key, required this.goNext});

  @override
  State<PermissionsMobileWidget> createState() => _PermissionsMobileWidgetState();
}

class _PermissionsMobileWidgetState extends State<PermissionsMobileWidget> {
  @override
  Widget build(BuildContext context) {
    return Consumer<OnboardingProvider>(builder: (context, provider, child) {
      return Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            Platform.isAndroid
                ? CheckboxListTile(
                    value: provider.hasBackgroundPermission,
                    onChanged: (s) async {
                      if (s != null) {
                        if (s) {
                          await provider.askForBackgroundPermissions();
                        } else {
                          provider.updateBackgroundPermission(false);
                        }
                      }
                    },
                    title: const Text(
                      'Let Omi run in the background for better stability.',
                      style: TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
                    ),
                    contentPadding: const EdgeInsets.only(left: 8),
                    checkboxShape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                  )
                : const SizedBox.shrink(),
            CheckboxListTile(
              value: provider.hasLocationPermission,
              onChanged: (s) async {
                if (s != null) {
                  if (s) {
                    var (serviceStatus, permissionStatus) = await provider.askForLocationPermissions();
                    if (!serviceStatus) {
                      showDialog(
                        context: context,
                        builder: (ctx) {
                          return getDialog(
                            context,
                            () => Navigator.of(context).pop(),
                            () => Navigator.of(context).pop(),
                            'Location Service Disabled',
                            'Location Service is Disabled. Please go to Settings > Privacy & Security > Location Services and enable it',
                            singleButton: true,
                          );
                        },
                      );
                    } else {
                      if (permissionStatus.isGranted) {
                        await provider.alwaysAllowLocation();
                        Permission.locationAlways.onDeniedCallback(() {
                          showDialog(
                            context: context,
                            builder: (ctx) {
                              return getDialog(
                                context,
                                () => Navigator.of(context).pop(),
                                () => Navigator.of(context).pop(),
                                'Background Location Access Denied',
                                'Please go to device settings and set location permission to "Always Allow"',
                                singleButton: true,
                                okButtonText: 'Continue',
                              );
                            },
                          );
                        });
                        Permission.locationAlways.onGrantedCallback(() {
                          provider.updateLocationPermission(true);
                        });
                      } else {
                        showDialog(
                          context: context,
                          builder: (ctx) {
                            return getDialog(
                              context,
                              () => Navigator.of(context).pop(),
                              () => Navigator.of(context).pop(),
                              'Background Location Access Denied',
                              'You can enable background location in the settings later if you change your mind',
                              singleButton: true,
                              okButtonText: 'close',
                            );
                          },
                        );
                      }
                    }
                  } else {
                    provider.updateLocationPermission(false);
                  }
                }
              },
              title: const Text(
                'Enable background location for the full experience',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
              ),
              contentPadding: const EdgeInsets.only(left: 8),
              checkboxShape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            ),
            CheckboxListTile(
              value: provider.hasNotificationPermission,
              onChanged: (s) async {
                if (s != null) {
                  if (s) {
                    await provider.askForNotificationPermissions();
                  } else {
                    provider.updateNotificationPermission(false);
                  }
                }
              },
              title: const Text(
                'Enable notifications to stay informed',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
              ),
              contentPadding: const EdgeInsets.only(left: 8),
              checkboxShape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            ),
            const SizedBox(height: 16),
            provider.isLoading
                ? const CircularProgressIndicator(
                    color: Colors.white,
                  )
                : Row(
                    children: [
                      Expanded(
                        child: Container(
                          width: double.infinity,
                          decoration: BoxDecoration(
                            border: const GradientBoxBorder(
                              gradient: LinearGradient(colors: [
                                Color.fromARGB(127, 208, 208, 208),
                                Color.fromARGB(127, 188, 99, 121),
                                Color.fromARGB(127, 86, 101, 182),
                                Color.fromARGB(127, 126, 190, 236)
                              ]),
                              width: 2,
                            ),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: MaterialButton(
                            padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
                            onPressed: () async {
                              provider.setLoading(true);
                              if (Platform.isAndroid) {
                                if (!provider.hasBackgroundPermission) {
                                  await provider.askForBackgroundPermissions();
                                }
                              }
                              await Permission.notification.request().then(
                                (value) async {
                                  if (value.isGranted) {
                                    provider.updateNotificationPermission(true);
                                  }
                                  if (await Permission.location.serviceStatus.isEnabled) {
                                    await Permission.locationWhenInUse.request().then(
                                      (value) async {
                                        if (value.isGranted) {
                                          await Permission.locationAlways.request().then(
                                            (value) async {
                                              if (value.isGranted) {
                                                provider.updateLocationPermission(true);
                                                widget.goNext();
                                                provider.setLoading(false);
                                              } else {
                                                Future.delayed(const Duration(milliseconds: 2500), () async {
                                                  if (await Permission.locationAlways.status.isGranted) {
                                                    provider.updateLocationPermission(true);
                                                  }
                                                  widget.goNext();
                                                  provider.setLoading(false);
                                                });
                                              }
                                            },
                                          );
                                        } else {
                                          widget.goNext();
                                          provider.setLoading(false);
                                        }
                                      },
                                    );
                                  } else {
                                    widget.goNext();
                                    provider.setLoading(false);
                                  }
                                },
                              );
                            },
                            child: const Text(
                              'Continue',
                              style: TextStyle(
                                decoration: TextDecoration.none,
                              ),
                            ),
                          ),
                        ),
                      )
                    ],
                  ),
            const SizedBox(
              height: 12,
            ),
            PlatformService.isIntercomSupported
                ? InkWell(
                    child: Text(
                      'Need Help?',
                      style: TextStyle(
                        color: Colors.grey.shade300,
                        decoration: TextDecoration.underline,
                      ),
                    ),
                    onTap: () {
                      Intercom.instance.displayMessenger();
                    },
                  )
                : const SizedBox.shrink(),
          ],
        ),
      );
    });
  }
}
